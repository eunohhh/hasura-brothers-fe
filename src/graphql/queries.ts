import { gql } from "@apollo/client";

// ============================================================================
// User Queries
// ============================================================================

export const GET_MY_INFO = gql`
  query GetMyInfo {
    user {
      no
      id
      email
      name
      profile_image
      provider
      provider_id
      accept_marketing
      meta_thumbnail_url
      meta_title
      meta_description
      is_admin
      created_at
      updated_at
    }
  }
`;

// ============================================================================
// Template Queries
// ============================================================================

export const GET_ALL_TEMPLATES = gql`
  query GetAllTemplates($limit: Int, $offset: Int) {
    template(limit: $limit, offset: $offset, order_by: { order: asc }) {
      no
      id
      invitation_id
      order
      created_at
      updated_at
      invitation {
        id
        layout_type
        brand_color
        font
      }
    }
  }
`;

// ============================================================================
// Image Queries
// ============================================================================

export const GET_IMAGE_INFO = gql`
  query GetImageInfo($id: uuid!) {
    invitation_attachment_by_pk(id: $id) {
      no
      id
      invitation_id
      widget_id
      type
      mime_type
      bucket
      key
      width
      height
      user_id
      created_at
    }
  }
`;

// ============================================================================
// Admin Queries
// ============================================================================

export const ADMIN_GET_TEMPLATES = gql`
  query AdminGetTemplates($limit: Int, $offset: Int) {
    template(limit: $limit, offset: $offset, order_by: { order: asc }) {
      no
      id
      invitation_id
      order
      created_at
      updated_at
      invitation {
        id
        layout_type
        brand_color
        font
        event_at
        place_name
      }
    }
  }
`;

export const ADMIN_GET_ALL_INVITATIONS = gql`
  query AdminGetAllInvitations($limit: Int, $offset: Int) {
    invitation(
      limit: $limit
      offset: $offset
      order_by: { created_at: desc }
      where: { removed_at: { _is_null: true } }
    ) {
      no
      id
      event_at
      full_day_schedule
      address
      road_address
      place_name
      place_detail
      coord
      layout_type
      brand_color
      font
      created_at
      updated_at
      invitation_owners {
        name
        role
      }
      invitation_editors {
        user {
          name
          email
        }
        is_creator
      }
    }
  }
`;

export const ADMIN_GET_INVITATION = gql`
  query AdminGetInvitation($id: uuid!) {
    invitation_by_pk(id: $id) {
      no
      id
      event_at
      full_day_schedule
      address
      road_address
      place_name
      place_detail
      coord
      layout_type
      brand_color
      font
      created_at
      updated_at
      invitation_owners {
        id
        name
        role
        level
        index
        given_name
        family_name
        family_name_first
      }
      invitation_editors {
        id
        user_id
        is_creator
        last_edit_at
        user {
          name
          email
        }
      }
      widgets {
        id
        type
        index
        config
      }
    }
  }
`;

export const ADMIN_SEARCH_USERS = gql`
  query AdminSearchUsers($search: String!, $limit: Int) {
    user(
      where: {
        _or: [
          { email: { _ilike: $search } }
          { name: { _ilike: $search } }
        ]
        removed_at: { _is_null: true }
      }
      limit: $limit
    ) {
      no
      id
      email
      name
      profile_image
      is_admin
      created_at
    }
  }
`;

export const ADMIN_GET_ME = gql`
  query AdminGetMe {
    user(where: { is_admin: { _eq: true } }, limit: 1) {
      no
      id
      email
      name
      profile_image
      is_admin
      created_at
    }
  }
`;

export const ADMIN_GET_STATISTICS = gql`
  query AdminGetStatistics {
    invitation_aggregate {
      aggregate {
        count
      }
    }
    user_aggregate(where: { removed_at: { _is_null: true } }) {
      aggregate {
        count
      }
    }
    order_aggregate(where: { status: { _eq: "COMPLETED" } }) {
      aggregate {
        count
      }
    }
    invitation_visit_log_aggregate {
      aggregate {
        count
      }
    }
  }
`;

// ============================================================================
// Invitation Queries
// ============================================================================

export const GET_INVITATION = gql`
  query GetInvitation($id: uuid!) {
    invitation_by_pk(id: $id) {
      no
      id
      event_at
      full_day_schedule
      address
      road_address
      place_name
      place_detail
      coord
      layout_type
      brand_color
      font
      created_at
      updated_at
      invitation_owners(order_by: { index: asc }) {
        id
        name
        role
        level
        index
        given_name
        family_name
        family_name_first
        father_given_name
        father_family_name
        father_family_name_first
        father_is_hidden
        father_is_deceased
        mother_given_name
        mother_family_name
        mother_family_name_first
        mother_is_hidden
        mother_is_deceased
      }
      widgets(order_by: { index: asc }) {
        id
        type
        index
        config
        created_at
        updated_at
      }
      invitation_shares(where: { visible: { _eq: true } }) {
        id
        share_key
        activation_method
        expired_at
        visible
      }
    }
  }
`;

export const GET_MY_INVITATIONS = gql`
  query GetMyInvitations($userId: uuid!) {
    invitation_editor(
      where: { user_id: { _eq: $userId } }
      order_by: { created_at: desc }
    ) {
      invitation {
        no
        id
        event_at
        place_name
        layout_type
        brand_color
        created_at
        updated_at
        invitation_owners(limit: 2) {
          name
          role
        }
        invitation_shares(where: { visible: { _eq: true } }, limit: 1) {
          share_key
        }
      }
      is_creator
      last_edit_at
    }
  }
`;

export const GET_INVITATION_ORDER = gql`
  query GetInvitationOrder($invitationId: uuid!) {
    order(
      where: { invitation_id: { _eq: $invitationId } }
      order_by: { created_at: desc }
      limit: 1
    ) {
      no
      id
      invitation_id
      status
      plan
      payment_key
      created_at
      updated_at
    }
  }
`;

export const GET_INVITATION_BY_SHARE_KEY = gql`
  query GetInvitationByShareKey($shareKey: String!) {
    invitation_share(where: { share_key: { _eq: $shareKey } }) {
      id
      share_key
      visible
      expired_at
      invitation {
        no
        id
        event_at
        full_day_schedule
        address
        road_address
        place_name
        place_detail
        coord
        layout_type
        brand_color
        font
        invitation_owners(order_by: { index: asc }) {
          id
          name
          role
          level
          given_name
          family_name
          family_name_first
          father_given_name
          father_family_name
          father_is_hidden
          father_is_deceased
          mother_given_name
          mother_family_name
          mother_is_hidden
          mother_is_deceased
        }
        widgets(order_by: { index: asc }) {
          id
          type
          index
          config
        }
      }
    }
  }
`;

export const GET_INVITATION_VISIT_COUNT = gql`
  query GetInvitationVisitCount($invitationId: uuid!) {
    invitation_visit_log_aggregate(
      where: { invitation_id: { _eq: $invitationId } }
    ) {
      aggregate {
        count
      }
    }
  }
`;

// ============================================================================
// RSVP Queries
// ============================================================================

export const GET_ALL_RSVP_ANSWERS = gql`
  query GetAllRsvpAnswers($invitationId: uuid!) {
    invitation_rsvp_answer(
      where: { invitation_id: { _eq: $invitationId } }
      order_by: { created_at: desc }
    ) {
      no
      id
      invitation_id
      user_tracking_id
      accepted
      form_values
      created_at
      updated_at
    }
  }
`;

export const GET_MY_RSVP_ANSWER = gql`
  query GetMyRsvpAnswer($invitationId: uuid!, $userTrackingId: String!) {
    invitation_rsvp_answer(
      where: {
        invitation_id: { _eq: $invitationId }
        user_tracking_id: { _eq: $userTrackingId }
      }
    ) {
      no
      id
      invitation_id
      user_tracking_id
      accepted
      form_values
      created_at
      updated_at
    }
  }
`;

export const GET_RSVP_ANSWER_COUNT = gql`
  query GetRsvpAnswerCount($invitationId: uuid!) {
    invitation_rsvp_answer_aggregate(
      where: { invitation_id: { _eq: $invitationId } }
    ) {
      aggregate {
        count
      }
    }
  }
`;

// ============================================================================
// Comment Queries
// ============================================================================

export const GET_INVITATION_COMMENTS = gql`
  query GetInvitationComments($invitationId: uuid!, $limit: Int, $offset: Int) {
    invitation_comment(
      where: {
        invitation_id: { _eq: $invitationId }
        removed_at: { _is_null: true }
        parent_id: { _is_null: true }
      }
      order_by: { created_at: desc }
      limit: $limit
      offset: $offset
    ) {
      no
      id
      invitation_id
      parent_id
      author
      author_profile_image
      body
      created_at
      updated_at
      replies: invitation_comments(
        where: { removed_at: { _is_null: true } }
        order_by: { created_at: asc }
      ) {
        no
        id
        parent_id
        author
        author_profile_image
        body
        created_at
        updated_at
      }
    }
  }
`;
