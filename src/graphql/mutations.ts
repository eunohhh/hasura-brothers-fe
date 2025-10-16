import { gql } from "@apollo/client";

// ============================================================================
// Auth Mutations
// ============================================================================

export const SAVE_REFRESH_TOKEN = gql`
  mutation SaveRefreshToken($object: user_tokens_insert_input!) {
    insert_user_tokens_one(object: $object) {
      id
    }
  }
`;

export const UPDATE_TOKEN_LAST_USED_BY_ID = gql`
  mutation UpdateTokenLastUsedById($tokenId: uuid!) {
    update_user_tokens_by_pk(
      pk_columns: { id: $tokenId }
      _set: { last_used_at: "now()", updated_at: "now()" }
    ) {
      id
    }
  }
`;

export const DELETE_TOKEN_BY_ID = gql`
  mutation DeleteTokenById($tokenId: uuid!) {
    delete_user_tokens_by_pk(id: $tokenId) {
      id
    }
  }
`;

export const DELETE_ALL_USER_TOKENS = gql`
  mutation DeleteAllUserTokens($userId: uuid!) {
    delete_user_tokens(where: { user_id: { _eq: $userId } }) {
      affected_rows
    }
  }
`;

// ============================================================================
// User Mutations
// ============================================================================

export const REGISTER_USER = gql`
  mutation RegisterUser(
    $id: uuid!
    $email: String
    $name: String
    $profile_image: String
    $provider: String
    $provider_id: String
    $accept_marketing: Boolean
  ) {
    insert_user_one(
      object: {
        id: $id
        email: $email
        name: $name
        profile_image: $profile_image
        provider: $provider
        provider_id: $provider_id
        accept_marketing: $accept_marketing
      }
      on_conflict: {
        constraint: user_provider_idx
        update_columns: [email, name, profile_image, updated_at]
      }
    ) {
      id
      email
      name
      profile_image
      is_admin
      created_at
    }
  }
`;

// ============================================================================
// Image Mutations
// ============================================================================

export const UPLOAD_INVITATION_IMAGE = gql`
  mutation UploadInvitationImage(
    $id: uuid!
    $invitation_id: uuid!
    $widget_id: uuid
    $type: String!
    $mime_type: String!
    $bucket: String!
    $key: String!
    $width: Int
    $height: Int
    $user_id: uuid
  ) {
    insert_invitation_attachment_one(
      object: {
        id: $id
        invitation_id: $invitation_id
        widget_id: $widget_id
        type: $type
        mime_type: $mime_type
        bucket: $bucket
        key: $key
        width: $width
        height: $height
        user_id: $user_id
      }
    ) {
      id
      invitation_id
      widget_id
      type
      bucket
      key
      width
      height
      created_at
    }
  }
`;

// ============================================================================
// Admin Mutations
// ============================================================================

export const ADMIN_CREATE_TEMPLATE = gql`
  mutation AdminCreateTemplate(
    $id: uuid!
    $invitation_id: uuid!
    $order: Int!
  ) {
    insert_template_one(
      object: { id: $id, invitation_id: $invitation_id, order: $order }
    ) {
      id
      invitation_id
      order
      created_at
    }
  }
`;

export const ADMIN_UPDATE_USER_ROLE = gql`
  mutation AdminUpdateUserRole($userId: uuid!, $isAdmin: Boolean!) {
    update_user_by_pk(pk_columns: { id: $userId }, _set: { is_admin: $isAdmin }) {
      id
      email
      name
      is_admin
      updated_at
    }
  }
`;

export const ADMIN_UPDATE_TEMPLATE_STAGE = gql`
  mutation AdminUpdateTemplateStage($id: uuid!, $order: Int!) {
    update_template_by_pk(pk_columns: { id: $id }, _set: { order: $order }) {
      id
      order
      updated_at
    }
  }
`;

export const ADMIN_UPDATE_TEMPLATE_TITLE = gql`
  mutation AdminUpdateTemplateTitle($invitationId: uuid!, $metaTitle: String!) {
    update_invitation_by_pk(
      pk_columns: { id: $invitationId }
    ) {
      id
      updated_at
    }
  }
`;

export const ADMIN_DELETE_TEMPLATE = gql`
  mutation AdminDeleteTemplate($id: uuid!) {
    delete_template_by_pk(id: $id) {
      id
    }
  }
`;

// TODO: Implement invitation duplication logic
// export const ADMIN_DUPLICATE_INVITATION = gql`
//   mutation AdminDuplicateInvitation($sourceInvitationId: uuid!) {
//     insert_invitation_one(object: { id: $sourceInvitationId }) {
//       id
//     }
//   }
// `;

export const ADMIN_UPDATE_TEMPLATE_ORDERS = gql`
  mutation AdminUpdateTemplateOrders($updates: [template_insert_input!]!) {
    insert_template(
      objects: $updates
      on_conflict: { constraint: template_pkey, update_columns: [order] }
    ) {
      affected_rows
    }
  }
`;

// ============================================================================
// Widget Mutations
// ============================================================================

export const UPDATE_WIDGET_CONFIG = gql`
  mutation UpdateWidgetConfig($id: uuid!, $config: jsonb!) {
    update_widget_by_pk(pk_columns: { id: $id }, _set: { config: $config }) {
      id
      config
      updated_at
    }
  }
`;

export const UPDATE_WIDGET_INDEX = gql`
  mutation UpdateWidgetIndex($id: uuid!, $index: Int!) {
    update_widget_by_pk(pk_columns: { id: $id }, _set: { index: $index }) {
      id
      index
      updated_at
    }
  }
`;

export const DELETE_WIDGET = gql`
  mutation DeleteWidget($id: uuid!) {
    delete_widget_by_pk(id: $id) {
      id
    }
  }
`;

export const ADD_WIDGET = gql`
  mutation AddWidget(
    $id: uuid!
    $invitation_id: uuid!
    $type: String!
    $index: Int!
    $config: jsonb
  ) {
    insert_widget_one(
      object: {
        id: $id
        invitation_id: $invitation_id
        type: $type
        index: $index
        config: $config
      }
    ) {
      id
      invitation_id
      type
      index
      config
      created_at
    }
  }
`;

// ============================================================================
// RSVP Mutations
// ============================================================================

export const SUBMIT_RSVP_ANSWER = gql`
  mutation SubmitRsvpAnswer(
    $id: uuid!
    $invitation_id: uuid!
    $user_tracking_id: String!
    $accepted: Boolean!
    $form_values: jsonb
  ) {
    insert_invitation_rsvp_answer_one(
      object: {
        id: $id
        invitation_id: $invitation_id
        user_tracking_id: $user_tracking_id
        accepted: $accepted
        form_values: $form_values
      }
      on_conflict: {
        constraint: invitation_rsvp_answer_invitation_user_idx
        update_columns: [accepted, form_values, updated_at]
      }
    ) {
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

// ============================================================================
// Comment Mutations
// ============================================================================

export const CREATE_COMMENT = gql`
  mutation CreateComment(
    $id: uuid!
    $invitation_id: uuid!
    $parent_id: uuid
    $author: String!
    $author_profile_image: String
    $body: String!
    $password: String
  ) {
    insert_invitation_comment_one(
      object: {
        id: $id
        invitation_id: $invitation_id
        parent_id: $parent_id
        author: $author
        author_profile_image: $author_profile_image
        body: $body
        password: $password
      }
    ) {
      id
      invitation_id
      parent_id
      author
      author_profile_image
      body
      created_at
    }
  }
`;

export const UPDATE_COMMENT = gql`
  mutation UpdateComment($id: uuid!, $body: String!, $password: String!) {
    update_invitation_comment_by_pk(
      pk_columns: { id: $id }
      _set: { body: $body, updated_at: "now()" }
    ) {
      id
      body
      updated_at
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation DeleteComment($id: uuid!, $password: String!) {
    update_invitation_comment_by_pk(
      pk_columns: { id: $id }
      _set: { removed_at: "now()" }
    ) {
      id
      removed_at
    }
  }
`;

// ============================================================================
// Invitation Mutations
// ============================================================================

export const CREATE_INVITATION = gql`
  mutation CreateInvitation(
    $id: uuid!
    $user_id: uuid!
    $share_key: String!
    $layout_type: String
    $brand_color: String
    $font: String
  ) {
    insert_invitation_one(
      object: {
        id: $id
        layout_type: $layout_type
        brand_color: $brand_color
        font: $font
        invitation_editors: { data: { id: $user_id, user_id: $user_id, is_creator: true } }
        invitation_shares: {
          data: { id: $user_id, share_key: $share_key, activation_method: "public" }
        }
      }
    ) {
      id
      layout_type
      brand_color
      font
      created_at
    }
  }
`;

export const UPDATE_INVITATION_EVENT_INFO = gql`
  mutation UpdateInvitationEventInfo(
    $id: uuid!
    $event_at: timestamptz
    $full_day_schedule: Boolean
    $address: String
    $road_address: String
    $place_name: String
    $place_detail: String
    $coord: String
  ) {
    update_invitation_by_pk(
      pk_columns: { id: $id }
      _set: {
        event_at: $event_at
        full_day_schedule: $full_day_schedule
        address: $address
        road_address: $road_address
        place_name: $place_name
        place_detail: $place_detail
        coord: $coord
      }
    ) {
      id
      event_at
      full_day_schedule
      address
      road_address
      place_name
      place_detail
      coord
      updated_at
    }
  }
`;

export const UPDATE_INVITATION_OWNERS = gql`
  mutation UpdateInvitationOwners(
    $invitation_id: uuid!
    $owners: [invitation_owner_insert_input!]!
  ) {
    delete_invitation_owner(where: { invitation_id: { _eq: $invitation_id } }) {
      affected_rows
    }
    insert_invitation_owner(objects: $owners) {
      returning {
        id
        invitation_id
        name
        role
        level
        index
      }
    }
  }
`;

export const UPDATE_INVITATION_META = gql`
  mutation UpdateInvitationMeta(
    $id: uuid!
  ) {
    update_invitation_by_pk(
      pk_columns: { id: $id }
      _set: {
      }
    ) {
      id
      updated_at
    }
  }
`;

export const UPDATE_INVITATION_DESIGN = gql`
  mutation UpdateInvitationDesign(
    $id: uuid!
    $layout_type: String
    $brand_color: String
    $font: String
  ) {
    update_invitation_by_pk(
      pk_columns: { id: $id }
      _set: { layout_type: $layout_type, brand_color: $brand_color, font: $font }
    ) {
      id
      layout_type
      brand_color
      font
      updated_at
    }
  }
`;

export const DELETE_INVITATION = gql`
  mutation DeleteInvitation($id: uuid!) {
    update_invitation_by_pk(pk_columns: { id: $id }, _set: { removed_at: "now()" }) {
      id
      removed_at
    }
  }
`;

export const SET_INVITATION_VISIBILITY = gql`
  mutation SetInvitationVisibility($invitation_id: uuid!, $visible: Boolean!) {
    update_invitation_share(
      where: { invitation_id: { _eq: $invitation_id } }
      _set: { visible: $visible }
    ) {
      affected_rows
    }
  }
`;

export const LOG_INVITATION_VISIT = gql`
  mutation LogInvitationVisit(
    $invitation_id: uuid!
    $user_tracking_id: String!
  ) {
    insert_invitation_visit_log_one(
      object: {
        invitation_id: $invitation_id
        user_tracking_id: $user_tracking_id
      }
    ) {
      invitation_id
      visit_at
    }
  }
`;

// TODO: Implement invitation duplication logic
// export const DUPLICATE_INVITATION = gql`
//   mutation DuplicateInvitation(
//     $newInvitationId: uuid!
//     $sourceInvitationId: uuid!
//     $userId: uuid!
//   ) {
//     insert_invitation_one(object: { id: $newInvitationId }) {
//       id
//     }
//   }
// `;

// ============================================================================
// Order Mutations
// ============================================================================

export const CONFIRM_ORDER = gql`
  mutation ConfirmOrder(
    $order_id: uuid!
    $status: String!
    $payment_key: String!
  ) {
    update_order_by_pk(
      pk_columns: { id: $order_id }
      _set: { status: $status, payment_key: $payment_key }
    ) {
      id
      status
      payment_key
      updated_at
    }
  }
`;

export const CONFIRM_FREE_ORDER = gql`
  mutation ConfirmFreeOrder($order_id: uuid!, $status: String!) {
    update_order_by_pk(pk_columns: { id: $order_id }, _set: { status: $status }) {
      id
      status
      updated_at
    }
  }
`;
