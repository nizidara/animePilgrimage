from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Tuple
import uuid

import models.comment as comment_model
import models.user as user_model
import models.place as place_model
import models.photo as photo_model
import schemas.comment as comment_schema

# create comment
async def create_comment(
        db: AsyncSession, comment_body: comment_schema.CommentCreate
) -> comment_schema.CommentResponse:
    
    # convert str -> UUID
    user_name = None
    place = None
    if comment_body:
        comment_dict = comment_body.model_dump()
        comment_dict['place_id'] = uuid.UUID(comment_body.place_id).bytes
        place = db.query(place_model.Place).filter(place_model.Place.place_id == comment_dict['place_id']).first()
        if comment_body.user_id is not None:
            comment_dict['user_id'] = uuid.UUID(comment_body.user_id).bytes
            user = db.query(user_model.User).filter(user_model.User.user_id == comment_dict['user_id']).first()
            user_name = user.user_name
    comment = comment_model.Comment(**comment_dict)

    # create
    db.add(comment)
    db.commit()
    db.refresh(comment)

    # convert UUID -> str
    response = None
    if comment:
        response_dict = comment.__dict__
        response_dict['comment_id'] = str(uuid.UUID(bytes=comment.comment_id))
        response_dict['place_id'] = str(uuid.UUID(bytes=comment.place_id))
        if comment.user_id is not None:
            response_dict['user_id'] = str(uuid.UUID(bytes=comment.user_id))
        response = comment_schema.CommentResponse(**response_dict, anime_id=place.anime_id, anime_title=place.anime.title, place_name=place.name, user_name=user_name, range_name=comment.range.range_name)

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
        comment = db.query(comment_model.Comment).filter(comment_model.Comment.comment_id == delete_comment_dict['comment_id'] ).first()
        comment_comment = comment.comment
        if comment_body.user_id is not None:
            delete_comment_dict['user_id'] = uuid.UUID(comment_body.user_id).bytes
            user = db.query(user_model.User).filter(user_model.User.user_id == delete_comment_dict['user_id']).first()
            user_name = user.user_name
    delete_comment = comment_model.DeleteComment(**delete_comment_dict)

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
async def get_comment_list(db:AsyncSession, anime_id: int, place_id: str) -> List[Tuple[comment_schema.CommentResponse]]:
    # get
    results = db.query(comment_model.Comment, user_model.User.user_name, place_model.Place, photo_model.RealPhoto.file_name).\
        outerjoin(user_model.User, comment_model.Comment.user_id == user_model.User.user_id).\
        outerjoin(place_model.Place, place_model.Place.place_id == comment_model.Comment.place_id).\
        outerjoin(photo_model.RealPhoto, comment_model.Comment.comment_id == photo_model.RealPhoto.comment_id).all()
    
    # convert UUID -> str
    response_list = []
    if results:
        for comment, user_name, place, file_name in results:
            response_dict = comment.__dict__
            response_dict['comment_id'] = str(uuid.UUID(bytes=comment.comment_id))
            response_dict['place_id'] = str(uuid.UUID(bytes=comment.place_id))
            if comment.user_id is not None:
                response_dict['user_id'] = str(uuid.UUID(bytes=comment.user_id))
            response_list.append(comment_schema.CommentResponse(**response_dict, anime_id=place.anime_id, anime_title=place.anime.title, place_name=place.name, user_name=user_name, range_name=comment.range.range_name, file_name=file_name))

    return response_list

# read detail
async def get_comment_detail(db: AsyncSession, comment_id: str) -> comment_schema.CommentResponse:
    # convert str -> UUID
    comment_id_bytes = uuid.UUID(comment_id).bytes
 
    # get
    result = db.query(comment_model.Comment, user_model.User.user_name, place_model.Place, photo_model.RealPhoto.file_name).\
        outerjoin(user_model.User, comment_model.Comment.user_id == user_model.User.user_id).\
        outerjoin(place_model.Place, place_model.Place.place_id == comment_model.Comment.place_id).\
        outerjoin(photo_model.RealPhoto, comment_model.Comment.comment_id == photo_model.RealPhoto.comment_id).\
        filter(comment_model.Comment.comment_id == comment_id_bytes).first()
    
    # convert UUID -> str
    response = None
    if result:
        comment, user_name, place, file_name = result
        response_dict = comment.__dict__
        response_dict['comment_id'] = str(uuid.UUID(bytes=comment.comment_id))
        response_dict['place_id'] = str(uuid.UUID(bytes=comment.place_id))
        if comment.user_id is not None:
            response_dict['user_id'] = str(uuid.UUID(bytes=comment.user_id))
        response = comment_schema.CommentResponse(**response_dict, anime_id=place.anime_id, anime_title=place.anime.title, place_name=place.name, user_name=user_name, range_name=comment.range.range_name, file_name=file_name)

    return response

# read report comment list
async def get_report_comment_list(db:AsyncSession) -> List[Tuple[comment_schema.DeleteCommentResponse]]:
    # get
    results = db.query(comment_model.DeleteComment, user_model.User.user_name, comment_model.Comment.comment).\
        outerjoin(user_model.User, comment_model.DeleteComment.user_id == user_model.User.user_id).\
        outerjoin(comment_model.Comment, comment_model.DeleteComment.comment_id == comment_model.Comment.comment_id).all()
    
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
        result = db.query(comment_model.Comment, user_model.User.user_name, place_model.Place).\
            outerjoin(user_model.User, comment_model.Comment.user_id == user_model.User.user_id).\
            outerjoin(place_model.Place, place_model.Place.place_id == comment_model.Comment.place_id).\
            filter(comment_model.Comment.comment_id == request.comment_id).first()

        if result:
            comment, user_name, place = result
            range_name = comment.range.range_name

            # delete comment (delete_comments DB is casecade on delete)
            db.delete(comment)
            db.commit()
            
            # convert UUID -> str
            response_dict = comment.__dict__
            response_dict['comment_id'] = str(uuid.UUID(bytes=comment.comment_id))
            response_dict['place_id'] = str(uuid.UUID(bytes=comment.place_id))
            if comment.user_id is not None:
                response_dict['user_id'] = str(uuid.UUID(bytes=comment.user_id))
            response = comment_schema.CommentResponse(**response_dict, anime_id=place.anime_id, anime_title=place.anime.title, place_name=place.name, user_name=user_name, range_name=range_name)

    return response

# delete comment
async def delete_comment(db: AsyncSession, comment_id: str) -> comment_model.Comment:
    # convert str -> UUID
    comment_id_bytes = uuid.UUID(comment_id).bytes
    
    # delete
    comment = db.query(comment_model.Comment).filter(comment_model.Comment.comment_id == comment_id_bytes).first()
    if comment:
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