import axios from "axios";

export type Topic = {
    _id: string;
    topic: string;
  };

export const categories = async(setCategory: (topics: Topic[]) => void, setLoading: (loading: boolean)=>void) => {
    const endpoint = `https://gardeninquiz.rushi173.repl.co/quizzes/topics`;
    setLoading(true)
    const res = await axios.get(endpoint);
    setCategory(res.data);
    setLoading(false);
  };

  