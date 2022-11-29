import React from "react"
import { Card } from "react-bootstrap"
import {Link} from "react-router-dom"
import  Avatar from "../../components/Avatart"
import styles from "../../styles/Comment.module.css"
import { useCurrentUser } from "../../contexts/CurrentUserContext"
import { axiosRes } from "../../api/Axios"

const Comment = (props) => {
    const {
      profile_id,
      profile_image,
      owner,
      updated_at,
      content,
      id,
      setPost,
      setComments,
    } = props;
    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
  
    const handleDelete = async () => {
      try {
        await axiosRes.delete(`/comments/${id}/`);
        setPost((prevPost) => ({
          results: [
            {
              ...prevPost.results[0],
              comments_count: prevPost.results[0].comments_count - 1,
            },
          ],
        }));
  
        setComments((prevComments) => ({
          ...prevComments,
          results: prevComments.results.filter((comment) => comment.id !== id),
        }));
      } catch (err) {}
    };
  

    return (
        <div>
            <hr/>
            <Card>
                <Link to={`/profiles/${profile_id}`}>
                    <Avatar src={profile_image}/>
                </Link>
                <Card.Body className="align-self-center" nl-2>
                    <span>{owner}</span>
                    <span>{updated_at}</span>
                    <p>{content}</p>
                </Card.Body>
            </Card>
        </div>
    )
}
export default Comment