import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import {
  RegisterUserMutation,
  UpdateUserByProviderMutation,
} from "@/generated/graphql";
import { REGISTER_USER, UPDATE_USER_BY_PROVIDER } from "@/graphql/mutations";
import { getAdminClient } from "@/lib/apollo-admin-client";

export async function POST(request: NextRequest) {
  if (
    !process.env.HASURA_GRAPHQL_ENDPOINT ||
    !process.env.HASURA_ADMIN_SECRET
  ) {
    return NextResponse.json(
      { error: "Hasura GraphQL endpoint or admin secret is not set" },
      { status: 500 },
    );
  }

  const body = await request.json();
  const { name, email, providerId, provider, profileImage } = body;

  // Hasura Admin Client (서버 전용)
  const client = getAdminClient();

  // Hasura mutation으로 유저 생성
  const newUserId = randomUUID();

  const { data, error } = await client.mutate<RegisterUserMutation>({
    mutation: REGISTER_USER,
    variables: {
      id: newUserId,
      email,
      name,
      profile_image: profileImage,
      provider,
      provider_id: providerId,
      accept_marketing: false,
    },
  });

  if (error) {
    // 제약조건이 없어 중복 오류 발생 시 업데이트로 폴백
    const upd = await client.mutate<UpdateUserByProviderMutation>({
      mutation: UPDATE_USER_BY_PROVIDER,
      variables: {
        provider,
        provider_id: providerId,
        email,
        name,
        profile_image: profileImage,
      },
    });
    const updated = upd.data?.update_user?.returning?.[0];
    if (!updated) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(updated, { status: 200 });
  }

  if (!data || !data.insert_user_one) {
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 500 },
    );
  }

  return NextResponse.json(data.insert_user_one, { status: 200 });
}
