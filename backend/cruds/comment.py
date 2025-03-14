from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import func
from typing import List, Tuple, Optional
from fastapi import HTTPException
from datetime import datetime, timezone
import uuid

import models.comment as comment_model
import models.user as user_model
import models.place as place_model
import models.photo as photo_model
import schemas.comment as comment_schema
import cruds.photo as photo_crud
import schemas.photo as photo_schema
import logic.input as input_logic
import logic.upload as upload_logic

# create comment
async def create_comment(
        db: AsyncSession, comment_body: comment_schema.CommentCreate
) -> comment_schema.CommentResponse:
    
    # convert str -> UUID
    user_name = None
    place = None
    if comment_body:
        comment_dict = comment_body.model_dump()
        comment_dict.pop("images", None)    # delete image field
        comment_dict['place_id'] = uuid.UUID(comment_body.place_id).bytes
        place = db.query(place_model.Place).filter(place_model.Place.place_id == comment_dict['place_id']).first()
        if comment_body.user_id is not None:
            comment_dict['user_id'] = uuid.UUID(comment_body.user_id).bytes
            user = db.query(user_model.User).filter(user_model.User.user_id == comment_dict['user_id']).first()
            user_name = user.user_name
        if comment_body.comment:
            comment_dict['comment'] = input_logic.normalize_break(comment_body.comment)
        
        current_time = datetime.now(tz=timezone.utc)

    comment = comment_model.Comment(**comment_dict, comment_date=current_time)

    # create comment DB
    db.add(comment)
    db.commit()
    db.refresh(comment)

    # save images
    file_names_response = []
    if comment_body.images:
        photo_body = photo_schema.RealPhotoCreate(
            images=comment_body.images,
            place_id=comment_body.place_id,
            comment_id=str(uuid.UUID(bytes=comment.comment_id)),
            user_id=comment_body.user_id,
        )
        photo_response = await photo_crud.create_real_photo(db=db, photo_body=photo_body)
        for photo in photo_response:
            file_names_response.append(photo.file_name)

    # convert UUID -> str
    response = None
    if comment:
        response_dict = comment.__dict__
        response_dict['comment_id'] = str(uuid.UUID(bytes=comment.comment_id))
        response_dict['place_id'] = str(uuid.UUID(bytes=comment.place_id))
        if comment.user_id is not None:
            response_dict['user_id'] = str(uuid.UUID(bytes=comment.user_id))
        response = comment_schema.CommentResponse(**response_dict, anime_id=place.anime_id, anime_title=place.anime.title, place_name=place.name, user_name=user_name, range_name=comment.range.range_name, file_names=file_names_response)

    return response

# create report comment
async def create_report_comment(
        db: AsyncSession, comment_body: comment_schema.DeleteCommentCreate
) -> comment_schema.DeleteCommentResponse:
    
    # convert str -> UUID
    user_name = None
    comment_comment = ""
    if comment_body:
        delete_comment_dict = comment_body.model_dump()
        delete_comment_dict['comment_id'] = uuid.UUID(comment_body.comment_id).bytes
        delete_comment_dict['contents'] = input_logic.normalize_break(comment_body.contents)
        comment = db.query(comment_model.Comment).filter(comment_model.Comment.comment_id == delete_comment_dict['comment_id'] ).first()
        comment_comment = comment.comment
        if comment_body.user_id is not None:
            delete_comment_dict['user_id'] = uuid.UUID(comment_body.user_id).bytes
            user = db.query(user_model.User).filter(user_model.User.user_id == delete_comment_dict['user_id']).first()
            user_name = user.user_name
        
        current_time = datetime.now(tz=timezone.utc)

    delete_comment = comment_model.DeleteComment(**delete_comment_dict, request_date=current_time)

    # create
    db.add(delete_comment)
    db.commit()
    db.refresh(delete_comment)

    # convert UUID -> str
    response = None
    if delete_comment:
        response_dict = delete_comment.__dict__
        response_dict['comment_id'] = str(uuid.UUID(bytes=delete_comment.comment_id))
        if delete_comment.user_id is not None:
            response_dict['user_id'] = str(uuid.UUID(bytes=delete_comment.user_id))
        response = comment_schema.DeleteCommentResponse(**response_dict, user_name=user_name, comment=comment_comment)

    return response

# read list
async def get_comment_list(db:AsyncSession, anime_id: Optional[int] = None, place_id: Optional[str] = None, page: int = 1, page_size: int = 50) -> comment_schema.PaginatedCommentResponse:
    # get    
    query = select(
        comment_model.Comment, 
        user_model.User.user_name, 
        place_model.Place, 
        func.group_concat(
            photo_model.RealPhoto.file_name.op("ORDER BY")(photo_model.RealPhoto.order.asc())
        ).label("file_names")
    ).\
        outerjoin(user_model.User, comment_model.Comment.user_id == user_model.User.user_id).\
        outerjoin(place_model.Place, place_model.Place.place_id == comment_model.Comment.place_id).\
        outerjoin(photo_model.RealPhoto, comment_model.Comment.comment_id == photo_model.RealPhoto.comment_id).\
        group_by(comment_model.Comment.comment_id, user_model.User.user_name, place_model.Place)
    
    # filter by anime_id:
    if anime_id is not None:
        query = query.where(place_model.Place.anime_id == anime_id)

    # filter by place_id
    if place_id is not None:
        # convert str -> UUID
        place_id_bytes = uuid.UUID(place_id).bytes
        query = query.where(comment_model.Comment.place_id == place_id_bytes)

    # Total Count Query
    total_count_query = select(func.count()).select_from(query.subquery())
    total_count = (db.execute(total_count_query)).scalar()

    # Pagination: calculate offset and limit
    if page < 1 or page_size < 1:
        raise HTTPException(status_code=400, detail="Page and page_size must be positive integers")
    
    # sort by comment_date in descending order
    offset = (page - 1) * page_size
    query = query.order_by(comment_model.Comment.comment_date.desc()).offset(offset).limit(page_size)

    results = db.execute(query).all()

    # convert UUID -> str
    response_list = []
    if results:
        for comment, user_name, place, file_names in results:
            # コメント ID を文字列に変換
            if isinstance(comment.comment_id, str):
                comment_id_str = comment.comment_id
            else:
                comment_id_str = str(uuid.UUID(bytes=comment.comment_id))

            # ユーザー ID を文字列に変換
            user_id_str = None
            if comment.user_id is not None:
                user_id_str = str(uuid.UUID(bytes=comment.user_id))

            # ファイル名をリストに変換
            file_names_list = file_names.split(",") if file_names else []

            # コメントデータを整形
            response_list.append(
                comment_schema.CommentResponse(
                    comment_id=comment_id_str,
                    comment=comment.comment,
                    comment_date=comment.comment_date,
                    range_id=comment.range_id,
                    range_name=comment.range.range_name,
                    place_id=str(uuid.UUID(bytes=comment.place_id)),
                    anime_id=place.anime_id,
                    anime_title=place.anime.title,
                    place_name=place.name,
                    user_name=user_name,
                    user_id=user_id_str,
                    file_names=file_names_list,
                )
            )

    return comment_schema.PaginatedCommentResponse(
        total_count=total_count,
        page=page,
        page_size=page_size,
        comments=response_list
    )

# read detail
async def get_comment_detail(db: AsyncSession, comment_id: str) -> comment_schema.CommentResponse:
    # convert str -> UUID
    comment_id_bytes = uuid.UUID(comment_id).bytes
 
    # get
    results = db.query(comment_model.Comment, user_model.User.user_name, place_model.Place, photo_model.RealPhoto.file_name, photo_model.RealPhoto.order).\
        outerjoin(user_model.User, comment_model.Comment.user_id == user_model.User.user_id).\
        outerjoin(place_model.Place, place_model.Place.place_id == comment_model.Comment.place_id).\
        outerjoin(photo_model.RealPhoto, comment_model.Comment.comment_id == photo_model.RealPhoto.comment_id).\
        filter(comment_model.Comment.comment_id == comment_id_bytes).\
        order_by(photo_model.RealPhoto.order.asc()).all()
    
    # convert UUID -> str
    response = None
    if results:
        comment, user_name, place = results[0][:3]
        file_names = [result[3] for result in results if result[3] is not None]

        response_dict = comment.__dict__.copy()
        response_dict['comment_id'] = str(uuid.UUID(bytes=comment.comment_id))
        response_dict['place_id'] = str(uuid.UUID(bytes=comment.place_id))
        if comment.user_id is not None:
            response_dict['user_id'] = str(uuid.UUID(bytes=comment.user_id))
        response = comment_schema.CommentResponse(**response_dict, anime_id=place.anime_id, anime_title=place.anime.title, place_name=place.name, user_name=user_name, range_name=comment.range.range_name, file_names=file_names)

    return response

# read report comment list
async def get_report_comment_list(db:AsyncSession) -> List[Tuple[comment_schema.DeleteCommentResponse]]:
    # get
    results = db.query(comment_model.DeleteComment, user_model.User.user_name, comment_model.Comment.comment).\
        outerjoin(user_model.User, comment_model.DeleteComment.user_id == user_model.User.user_id).\
        outerjoin(comment_model.Comment, comment_model.DeleteComment.comment_id == comment_model.Comment.comment_id).\
        order_by(comment_model.DeleteComment.request_date.desc()).all()
    
    # convert UUID -> str
    response_list = []
    if results:
        for delete_comment, user_name, comment in results:
            response_dict = delete_comment.__dict__
            response_dict['comment_id'] = str(uuid.UUID(bytes=delete_comment.comment_id))
            if delete_comment.user_id is not None:
                response_dict['user_id'] = str(uuid.UUID(bytes=delete_comment.user_id))
            response_list.append(comment_schema.DeleteCommentResponse(**response_dict, user_name=user_name, comment=comment))

    return response_list

# read report comment detail
async def get_report_comment_detail(db: AsyncSession, delete_comment_id: int) -> comment_schema.DeleteCommentResponse:
    # get
    result = db.query(comment_model.DeleteComment, user_model.User.user_name, comment_model.Comment.comment).\
        outerjoin(user_model.User, comment_model.DeleteComment.user_id == user_model.User.user_id).\
        outerjoin(comment_model.Comment, comment_model.DeleteComment.comment_id == comment_model.Comment.comment_id).\
        filter(comment_model.DeleteComment.delete_comment_id == delete_comment_id).first()
    
    # convert UUID -> str
    response = None
    if result:
        delete_comment, user_name, comment = result
        response_dict = delete_comment.__dict__
        response_dict['comment_id'] = str(uuid.UUID(bytes=delete_comment.comment_id))
        if delete_comment.user_id is not None:
            response_dict['user_id'] = str(uuid.UUID(bytes=delete_comment.user_id))
        response = comment_schema.DeleteCommentResponse(**response_dict, user_name=user_name, comment=comment)

    return response

# approve delete comment request
async def approve_delete_comment(db: AsyncSession, delete_comment_id: int) -> comment_schema.CommentResponse:
    #get
    request = db.query(comment_model.DeleteComment).filter(comment_model.DeleteComment.delete_comment_id == delete_comment_id).first()
    
    response = None
    if request:
        # get
        results = db.query(comment_model.Comment, user_model.User.user_name, place_model.Place, photo_model.RealPhoto.file_name, photo_model.RealPhoto.order).\
            outerjoin(user_model.User, comment_model.Comment.user_id == user_model.User.user_id).\
            outerjoin(place_model.Place, place_model.Place.place_id == comment_model.Comment.place_id).\
            outerjoin(photo_model.RealPhoto, comment_model.Comment.comment_id == photo_model.RealPhoto.comment_id).\
            filter(comment_model.Comment.comment_id == request.comment_id).\
            order_by(photo_model.RealPhoto.order.asc()).all()

        if results:
            comment, user_name, place = results[0][:3]

            # delete image file
            file_names = [result[3] for result in results if result[3] is not None]
            for file_name in file_names:
                upload_logic.delete_file_from_s3(file_name)
                    
            range_name = comment.range.range_name
            # delete comment (delete_comments DB is casecade on delete)
            db.delete(comment)
            db.commit()
            
            # convert UUID -> str
            response_dict = comment.__dict__.copy()
            response_dict['comment_id'] = str(uuid.UUID(bytes=comment.comment_id))
            response_dict['place_id'] = str(uuid.UUID(bytes=comment.place_id))
            if comment.user_id is not None:
                response_dict['user_id'] = str(uuid.UUID(bytes=comment.user_id))
            response = comment_schema.CommentResponse(**response_dict, anime_id=place.anime_id, anime_title=place.anime.title, place_name=place.name, user_name=user_name, range_name=range_name, file_names=file_names)

    return response

# delete comment
async def delete_comment(db: AsyncSession, comment_id: str) -> comment_model.Comment:
    # convert str -> UUID
    comment_id_bytes = uuid.UUID(comment_id).bytes
    
    # delete
    comment = db.query(comment_model.Comment).filter(comment_model.Comment.comment_id == comment_id_bytes).first()
    if comment:
        photos = db.query(photo_model.RealPhoto).filter(photo_model.RealPhoto.comment_id == comment_id_bytes).all()
        for photo in photos:
            if photo:
                upload_logic.delete_file_from_s3(photo.file_name)
        db.delete(comment)
        db.commit()
    return comment

# delete delete comment
async def delete_delete_comment(db: AsyncSession, delete_comment_id: int) -> comment_model.DeleteComment:
    # delete
    comment = db.query(comment_model.DeleteComment).filter(comment_model.DeleteComment.delete_comment_id == delete_comment_id).first()
    if comment:
        db.delete(comment)
        db.commit()
    return comment