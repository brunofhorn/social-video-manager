export interface IVideoPost {
  social_id: string;
  link: string;
  post_date: string;
  social?: {
    id: string;
    name: string;
    icon: string;
  };
}

export interface IVideo {
  id: string;
  title: string;
  description: string;
  created_at: string;
  was_reposted: boolean;
  was_boosted: boolean;
  posts: IVideoPost[];
}