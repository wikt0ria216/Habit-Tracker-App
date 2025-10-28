import "./tag.css";

interface TagProps {
  tag: string;
}

const Tag = ({ tag }: TagProps) => {
  return (
    <span className="tag" role="listitem">
      {tag}
    </span>
  );
};

export default Tag;
