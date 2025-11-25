import Tag from "../Tag/Tag";
import "./taglist.css";
interface TagListProps {
  tags: string[];
  ariaLabel?: string;
}

const TagList = ({ tags, ariaLabel = "List of tags" }: TagListProps) => {
  return (
    <ul className="tags-list" aria-label={ariaLabel}>
      {tags.map((tag) => (
        <li key={`${tag}-item`} className="tag-item">
          <Tag tag={tag} />
        </li>
      ))}
    </ul>
  );
};

export default TagList;
