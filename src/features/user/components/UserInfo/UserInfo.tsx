import "./userinfo.css";

interface UserInfoProps {
  avatarUrl?: string | null | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
}

const UserInfo = ({
  avatarUrl,
  firstName,
  lastName,
  email,
}: UserInfoProps) => {
  return (
    <div className="user-info">
      <div className="user-info-avatar">
        <img src={avatarUrl ?? "/user-img.png"} alt={`${firstName}'s avatar`} />
      </div>
      <div className="user-info-details">
        <div className="user-info-row">
          <p className="user-info-username">
            {firstName} {lastName}
          </p>
        </div>
        <p className="user-info-email">{email}</p>
      </div>
    </div>
  );
};

export default UserInfo;
