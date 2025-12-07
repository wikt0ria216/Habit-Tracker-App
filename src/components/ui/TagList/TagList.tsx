import Tag from "../Tag/Tag";
import "./taglist.css";
interface TagListProps {
  tags: string[];
}

const TagList = ({ tags }: TagListProps) => {
  return (
    <ul className="tags-list">
      {tags.map((tag) => (
        <li key={`${tag}-item`} className="tag-item">
          <Tag tag={tag} />
        </li>
      ))}
    </ul>
  );
};

export default TagList;
