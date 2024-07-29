import { useEffect, useState } from "react"
import axios from "axios";
import { fastAPIURL } from "../../properties/properties";
import { responseCommentData } from "../../type/api/comment";

export const useGetCommenDetail = (comment_id: string | null) => {
  const [comment, setComment] = useState<responseCommentData>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const url = fastAPIURL;

  useEffect(() => {
    axios.get(url + "/comments/detail/" + comment_id)
      .then(response => {
        setComment(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, [comment_id]);

  return { comment, loading, error };
};