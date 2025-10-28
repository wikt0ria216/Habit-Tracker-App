import Tag from "../Tag/Tag";
import "./taglist.css";
interface TagListProps {
  tags: string[];
  ariaLabel?: string;
  id?: string;
}

const TagList = ({ tags, ariaLabel = "List of tags", id }: TagListProps) => {
  return (
    <ul className="tags-list" role="list" aria-label={ariaLabel} id={id}>
      {tags.map((tag) => (
        <li key={`${tag}-id`} className="tag-item">
          <Tag tag={tag} />
        </li>
      ))}
    </ul>
  );
};

export default TagList;
