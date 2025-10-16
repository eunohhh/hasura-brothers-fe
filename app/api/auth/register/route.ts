import { NextRequest, NextResponse } from "next/server";
import { RegisterUserMutation } from "@/generated/graphql";
import { REGISTER_USER } from "@/graphql/mutations";
import { getClient } from "@/lib/apollo-client";

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

  // Hasura Client 생성
  const client = getClient();

  // Hasura mutation으로 유저 생성
  const { data, error } = await client.mutate<RegisterUserMutation>({
    mutation: REGISTER_USER,
    variables: {
      object: {
        name,
        email,
        provider_id: providerId,
        provider,
        profile_image: profileImage,
      },
    },
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!data || !data.insert_user_one) {
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 500 },
    );
  }

  return NextResponse.json(data.insert_user_one, { status: 200 });
}
