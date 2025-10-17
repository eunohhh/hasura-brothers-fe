export type GoogleUser = {
  id: string;
  email: string;
  name: string;
  picture: string;
};

export type KakaoUser = {
  id: number;
  connected_at: string;
  properties: {
    nickname: string;
    profile_image?: string;
    thumbnail_image?: string;
  };
  kakao_account: {
    profile: {
      nickname: string;
      thumbnail_image_url?: string;
      profile_image_url?: string;
    };
    email?: string;
    email_verified?: boolean;
  };
};
