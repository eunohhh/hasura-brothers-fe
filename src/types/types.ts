export type UserTokenResponse = {
  user: {
    id: string;
    email: string;
    name: string;
    picture: string;
  } | null;
};

export type GoogleUser = {
  id: string;
  email: string;
  name: string;
  picture: string;
  sub: string;
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
    email: string;
    email_verified?: boolean;
  };
};

export type RefreshTokenResponse = {
  success: boolean;
  token: string;
  expiresIn: number;
};

export type LogoutResponse = {
  success: boolean;
};

export type RefreshTokenErrorResponse = {
  error: string;
};

export type UserCheckResponse = {
  user: {
    id: string;
    email: string;
    // name: string;
    // picture: string;
    phone: string | null;
  } | null;
};

export type RegisterFormData = {
  phone: string;
  email: string;
  provider: string;
};

export type RegisterResponse = {
  success: boolean;
  user: {
    id: string;
    email: string;
    name: string;
    // picture: string;
  } | null;
};

export type NaverPlaceData = {
  siteId: string;
  category: string;
  roadAddress: string;
  name?: string;
  phone?: string;
  virtualPhone?: string;
  description?: string;
  reviews?: {
    id?: string;
    content: string;
  }[];
};
