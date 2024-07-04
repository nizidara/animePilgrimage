from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Tuple
import uuid

import models.comment as comment_model
import schemas.comment as comment_schema

# create comment
async def create_comment(
        db: AsyncSession, comment_body: comment_schema.CommentCreate
) -> comment_schema.CommentResponse:
    
    # convert str -> UUID
    if comment_body:
        comment_dict = comment_body.model_dump()
        comment_dict['place_id'] = uuid.UUID(comment_body.place_id).bytes
        if comment_body.user_id is not None:
            comment_dict['user_id'] = uuid.UUID(comment_body.user_id).bytes
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
        response = comment_schema.CommentResponse(**response_dict)

    return response

# create report comment
async def create_report_comment(
        db: AsyncSession, comment_body: comment_schema.DeleteCommentCreate
) -> comment_schema.DeleteCommentResponse:
    
    # convert str -> UUID
    if comment_body:
        comment_dict = comment_body.model_dump()
        comment_dict['comment_id'] = uuid.UUID(comment_body.comment_id).bytes
        if comment_body.user_id is not None:
            comment_dict['user_id'] = uuid.UUID(comment_body.user_id).bytes
    comment = comment_model.DeleteComment(**comment_dict)

    # create
    db.add(comment)
    db.commit()
    db.refresh(comment)

    # convert UUID -> str
    response = None
    if comment:
        response_dict = comment.__dict__
        response_dict['comment_id'] = str(uuid.UUID(bytes=comment.comment_id))
        if comment.user_id is not None:
            response_dict['user_id'] = str(uuid.UUID(bytes=comment.user_id))
        response = comment_schema.DeleteCommentResponse(**response_dict)

    return response

# read list
async def get_comment_list(db:AsyncSession, anime_id: int, place_id: str) -> List[Tuple[comment_schema.CommentResponse]]:
    # get
    comments = db.query(comment_model.Comment).all()
    
    # convert UUID -> str
    response_list = []
    if comments:
        for comment in comments:
            response_dict = comment.__dict__
            response_dict['comment_id'] = str(uuid.UUID(bytes=comment.comment_id))
            response_dict['place_id'] = str(uuid.UUID(bytes=comment.place_id))
            if comment.user_id is not None:
                response_dict['user_id'] = str(uuid.UUID(bytes=comment.user_id))
            response_list.append(comment_schema.CommentResponse(**response_dict))

    return response_list

# read detail
async def get_comment_detail(db: AsyncSession, comment_id: str) -> comment_schema.CommentResponse:
    # convert str -> UUID
    comment_id_bytes = uuid.UUID(comment_id).bytes

    # get
    comment = db.query(comment_model.Comment).filter(comment_model.Comment.comment_id == comment_id_bytes).first()
    
    # convert UUID -> str
    response = None
    if comment:
        response_dict = comment.__dict__
        response_dict['comment_id'] = str(uuid.UUID(bytes=comment.comment_id))
        response_dict['place_id'] = str(uuid.UUID(bytes=comment.place_id))
        if comment.user_id is not None:
            response_dict['user_id'] = str(uuid.UUID(bytes=comment.user_id))
        response = comment_schema.CommentResponse(**response_dict)

    return response

# read report comment list
async def get_report_comment_list(db:AsyncSession) -> List[Tuple[comment_schema.DeleteCommentResponse]]:
    # get
    comments = db.query(comment_model.DeleteComment).all()
    
    # convert UUID -> str
    response_list = []
    if comments:
        for comment in comments:
            response_dict = comment.__dict__
            response_dict['comment_id'] = str(uuid.UUID(bytes=comment.comment_id))
            if comment.user_id is not None:
                response_dict['user_id'] = str(uuid.UUID(bytes=comment.user_id))
            response_list.append(comment_schema.DeleteCommentResponse(**response_dict))

    return response_list

# read report comment detail
async def get_report_comment_detail(db: AsyncSession, delete_comment_id: int) -> comment_schema.DeleteCommentResponse:
    # get
    comment = db.query(comment_model.DeleteComment).filter(comment_model.DeleteComment.delete_comment_id == delete_comment_id).first()
    
    # convert UUID -> str
    response = None
    if comment:
        response_dict = comment.__dict__
        response_dict['comment_id'] = str(uuid.UUID(bytes=comment.comment_id))
        if comment.user_id is not None:
            response_dict['user_id'] = str(uuid.UUID(bytes=comment.user_id))
        response = comment_schema.DeleteCommentResponse(**response_dict)

    return response

# approve request place
async def approve_delete_comment(db: AsyncSession, delete_comment_id: int) -> comment_schema.CommentResponse:
    request = db.query(comment_model.DeleteComment).filter(comment_model.DeleteComment.delete_comment_id == delete_comment_id).first()
    response = None

    if request:
        # get
        comment = db.query(comment_model.Comment).filter(comment_model.Comment.comment_id == request.comment_id).first()

        if comment:
            # delete comment (delete_comments DB is casecade on delete)
            db.delete(comment)
            db.commit()
            
            # convert UUID -> str
            response_dict = comment.__dict__
            response_dict['comment_id'] = str(uuid.UUID(bytes=comment.comment_id))
            response_dict['place_id'] = str(uuid.UUID(bytes=comment.place_id))
            if comment.user_id is not None:
                response_dict['user_id'] = str(uuid.UUID(bytes=comment.user_id))
            response = comment_schema.CommentResponse(**response_dict)

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
async def delete_comment(db: AsyncSession, delete_comment_id: str) -> comment_model.DeleteComment:
    # delete
    comment = db.query(comment_model.DeleteComment).filter(comment_model.DeleteComment.delete_comment_id == delete_comment_id).first()
    if comment:
        db.delete(comment)
        db.commit()
    return comment