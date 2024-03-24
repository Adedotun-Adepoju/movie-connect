import { formatCommunityMembers, getTimeAgo } from "@/utils";

interface CommunityCardProps {
  community: {
    name: string;
    image: string;
    members: number;
    lastActivity: string;
    lastNotification?: string;
  };
  member: boolean;
  handleJoin: Function;
}

const CommunityCard = ({ community, member, handleJoin }: CommunityCardProps) => {
  return (
    <div className="mt-6">
      <div className="flex items-center justify-between">
        <div className="mr-4 flex items-center">
          <img
            src="https://via.placeholder.com/150"
            alt="Community"
            className="h-12 w-12 rounded-md"
          />
          <div className="ml-4">
            <h3 className="font-semibold">{community.name}</h3>
            <p className="line-clamp-1 text-gray-500">
              {member
                ? community.lastNotification ||
                  getTimeAgo(community.lastActivity)
                : formatCommunityMembers(community.members)}
            </p>
          </div>
        </div>
        {!member && (
          <button onClick={() => handleJoin(community.name)} className="h-8 rounded-md bg-primary px-6 font-semibold text-light">
            Join
          </button>
        )}
      </div>
    </div>
  );
};

export default CommunityCard;
