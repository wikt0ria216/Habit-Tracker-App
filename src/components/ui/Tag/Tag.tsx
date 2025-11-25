import "./tag.css";

interface TagProps {
  tag: string;
}

const Tag = ({ tag }: TagProps) => {
  return (
    <span className="tag">
      {tag}
    </span>
  );
};

export default Tag;
