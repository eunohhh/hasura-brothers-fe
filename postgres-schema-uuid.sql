-- PostgreSQL schema with UUID as primary key
-- Notes:
-- - UUID as primary key instead of bigint
-- - no field removed for cleaner structure
-- - All foreign keys reference uuid

create schema if not exists public;
set search_path to public;

-- user
create table if not exists "user" (
    id                 uuid primary key default gen_random_uuid(),
    email              varchar(100),
    "name"            varchar(50),
    profile_image      varchar(255),
    provider           varchar(30),
    provider_id        varchar(255),
    accept_marketing   boolean default false,
    removed_at         timestamptz,
    created_at         timestamptz default CURRENT_TIMESTAMP,
    updated_at         timestamptz default CURRENT_TIMESTAMP,
    is_admin           boolean default false
);
create unique index if not exists user_provider_idx on "user" (provider, provider_id);

-- invitation
create table if not exists invitation (
    id                 uuid primary key default gen_random_uuid(),
    event_at           timestamptz,
    full_day_schedule  boolean default false,
    address            varchar(100),
    road_address       varchar(100),
    place_name         varchar(100),
    place_detail       varchar(100),
    coord              varchar(100),
    layout_type        varchar(20),
    brand_color        varchar(30),
    font               varchar(30),
    removed_at         timestamptz,
    created_at         timestamptz default CURRENT_TIMESTAMP,
    updated_at         timestamptz default CURRENT_TIMESTAMP
);

-- invitation_owner
create table if not exists invitation_owner (
    id                         uuid primary key default gen_random_uuid(),
    invitation_id              uuid,
    "name"                    varchar(50),
    role                       varchar(20),
    level                      varchar(20),
    index                      int,
    -- v1 fields
    given_name                 varchar(50),
    family_name                varchar(50),
    family_name_first          boolean default true,
    father_given_name          varchar(50),
    father_family_name         varchar(50),
    father_family_name_first   boolean default true,
    father_is_hidden           boolean default true,
    father_is_deceased         boolean default false,
    mother_given_name          varchar(50),
    mother_family_name         varchar(50),
    mother_family_name_first   boolean default true,
    mother_is_hidden           boolean default true,
    mother_is_deceased         boolean default false,
    created_at                 timestamptz default CURRENT_TIMESTAMP,
    updated_at                 timestamptz default CURRENT_TIMESTAMP
);
create index if not exists invitation_owner_invitation_idx on invitation_owner (invitation_id);

-- invitation_editor
create table if not exists invitation_editor (
    id            uuid primary key default gen_random_uuid(),
    invitation_id uuid,
    user_id       uuid,
    is_creator    boolean default false,
    last_edit_at  timestamptz,
    created_at    timestamptz default CURRENT_TIMESTAMP
);
create index if not exists invitation_editor_invitation_idx on invitation_editor (invitation_id);
create index if not exists invitation_editor_user_idx on invitation_editor (user_id);

-- widget
create table if not exists widget (
    id            uuid primary key default gen_random_uuid(),
    invitation_id uuid,
    type          varchar(30),
    index         int,
    config        jsonb,
    created_at    timestamptz default CURRENT_TIMESTAMP,
    updated_at    timestamptz default CURRENT_TIMESTAMP
);
create index if not exists widget_invitation_idx on widget (invitation_id);

-- invitation_attachment
create table if not exists invitation_attachment (
    id            uuid primary key default gen_random_uuid(),
    invitation_id uuid,
    widget_id     uuid,
    type          varchar(30),
    mime_type     varchar(50),
    bucket        varchar(255),
    key           varchar(255),
    width         int,
    height        int,
    user_id       uuid,
    created_at    timestamptz default CURRENT_TIMESTAMP
);
create index if not exists invitation_attachment_invitation_idx on invitation_attachment (invitation_id);
create index if not exists invitation_attachment_widget_idx on invitation_attachment (widget_id);
create index if not exists invitation_attachment_user_idx on invitation_attachment (user_id);

-- invitation_share
create table if not exists invitation_share (
    id                uuid primary key default gen_random_uuid(),
    invitation_id     uuid,
    share_key         varchar(100) not null,
    activation_method varchar(20),
    expired_at        timestamptz,
    visible           boolean default true,
    created_at        timestamptz default CURRENT_TIMESTAMP,
    updated_at        timestamptz default CURRENT_TIMESTAMP
);
create unique index if not exists invitation_share_key_idx on invitation_share (share_key);
create index if not exists invitation_share_invitation_idx on invitation_share (invitation_id);

-- order
create table if not exists "order" (
    id            uuid primary key default gen_random_uuid(),
    invitation_id uuid,
    status        varchar(30),
    plan          varchar(30),
    payment_key   varchar(255),
    created_at    timestamptz default CURRENT_TIMESTAMP,
    updated_at    timestamptz default CURRENT_TIMESTAMP
);
create index if not exists order_invitation_idx on "order" (invitation_id);

-- template
create table if not exists template (
    id            uuid primary key default gen_random_uuid(),
    invitation_id uuid,
    "order"      int,
    created_at    timestamptz default CURRENT_TIMESTAMP,
    updated_at    timestamptz default CURRENT_TIMESTAMP
);
create index if not exists template_invitation_idx on template (invitation_id);

-- invitation_comment
create table if not exists invitation_comment (
    id                    uuid primary key default gen_random_uuid(),
    invitation_id         uuid,
    parent_id             uuid,
    author                varchar(50),
    author_profile_image  varchar(100),
    body                  text,
    password              varchar(60),
    removed_at            timestamptz,
    created_at            timestamptz default CURRENT_TIMESTAMP,
    updated_at            timestamptz default CURRENT_TIMESTAMP
);
create index if not exists invitation_comment_invitation_idx on invitation_comment (invitation_id);
create index if not exists invitation_comment_parent_id_idx on invitation_comment (parent_id);

-- coupon
create table if not exists coupon (
    id               uuid primary key default gen_random_uuid(),
    "group"         varchar(20),
    code             varchar(100),
    discount_percent int,
    expiring_date    timestamptz,
    used_at          timestamptz,
    created_at       timestamptz default CURRENT_TIMESTAMP,
    updated_at       timestamptz default CURRENT_TIMESTAMP
);
create unique index if not exists coupon_code_idx on coupon (code);

-- coupon_using_history
create table if not exists coupon_using_history (
    id            uuid primary key default gen_random_uuid(),
    invitation_id uuid,
    order_id      uuid,
    coupon_id     uuid,
    created_at    timestamptz default CURRENT_TIMESTAMP
);
create unique index if not exists coupon_using_history_coupon_id_idx on coupon_using_history (coupon_id);
create index if not exists coupon_using_history_invitation_idx on coupon_using_history (invitation_id);
create index if not exists coupon_using_history_order_idx on coupon_using_history (order_id);

-- invitation_visit_log
create table if not exists invitation_visit_log (
    id                bigserial primary key,
    invitation_id     uuid,
    user_tracking_id  varchar(30),
    visit_at          timestamptz default CURRENT_TIMESTAMP
);
create index if not exists invitation_visit_log_invitation_id_idx on invitation_visit_log (invitation_id);

-- invitation_rsvp_answer
create table if not exists invitation_rsvp_answer (
    id               uuid primary key default gen_random_uuid(),
    invitation_id    uuid,
    user_tracking_id varchar(30),
    accepted         boolean,
    form_values      jsonb,
    created_at       timestamptz default CURRENT_TIMESTAMP,
    updated_at       timestamptz default CURRENT_TIMESTAMP
);
create unique index if not exists invitation_rsvp_answer_invitation_user_idx on invitation_rsvp_answer (invitation_id, user_tracking_id);

-- widget_sticker
create table if not exists widget_sticker (
    id        uuid primary key default gen_random_uuid(),
    widget_id uuid,
    image_id  varchar(30),
    top       numeric(10, 2),
    "left"    numeric(10, 2),
    width     numeric(10, 2),
    created_at timestamptz default CURRENT_TIMESTAMP,
    updated_at timestamptz default CURRENT_TIMESTAMP
);
create index if not exists widget_sticker_widget_idx on widget_sticker (widget_id);

-- Foreign Keys
alter table invitation_owner drop constraint if exists fk_invitation_owner_invitation;
alter table invitation_owner add constraint fk_invitation_owner_invitation foreign key (invitation_id) references invitation(id) on delete cascade on update cascade;

alter table invitation_editor drop constraint if exists fk_invitation_editor_invitation;
alter table invitation_editor add constraint fk_invitation_editor_invitation foreign key (invitation_id) references invitation(id) on delete cascade on update cascade;
alter table invitation_editor drop constraint if exists fk_invitation_editor_user;
alter table invitation_editor add constraint fk_invitation_editor_user foreign key (user_id) references "user"(id) on delete set null on update cascade;

alter table widget drop constraint if exists fk_widget_invitation;
alter table widget add constraint fk_widget_invitation foreign key (invitation_id) references invitation(id) on delete cascade on update cascade;

alter table invitation_attachment drop constraint if exists fk_invitation_attachment_invitation;
alter table invitation_attachment add constraint fk_invitation_attachment_invitation foreign key (invitation_id) references invitation(id) on delete cascade on update cascade;
alter table invitation_attachment drop constraint if exists fk_invitation_attachment_widget;
alter table invitation_attachment add constraint fk_invitation_attachment_widget foreign key (widget_id) references widget(id) on delete cascade on update cascade;
alter table invitation_attachment drop constraint if exists fk_invitation_attachment_user;
alter table invitation_attachment add constraint fk_invitation_attachment_user foreign key (user_id) references "user"(id) on delete set null on update cascade;

alter table invitation_share drop constraint if exists fk_invitation_share_invitation;
alter table invitation_share add constraint fk_invitation_share_invitation foreign key (invitation_id) references invitation(id) on delete cascade on update cascade;

alter table "order" drop constraint if exists fk_order_invitation;
alter table "order" add constraint fk_order_invitation foreign key (invitation_id) references invitation(id) on delete set null on update cascade;

alter table template drop constraint if exists fk_template_invitation;
alter table template add constraint fk_template_invitation foreign key (invitation_id) references invitation(id) on delete cascade on update cascade;

alter table invitation_comment drop constraint if exists fk_invitation_comment_invitation;
alter table invitation_comment add constraint fk_invitation_comment_invitation foreign key (invitation_id) references invitation(id) on delete cascade on update cascade;
alter table invitation_comment drop constraint if exists fk_invitation_comment_parent;
alter table invitation_comment add constraint fk_invitation_comment_parent foreign key (parent_id) references invitation_comment(id) on delete set null on update cascade;

alter table coupon_using_history drop constraint if exists fk_coupon_using_history_invitation;
alter table coupon_using_history add constraint fk_coupon_using_history_invitation foreign key (invitation_id) references invitation(id) on delete set null on update cascade;
alter table coupon_using_history drop constraint if exists fk_coupon_using_history_order;
alter table coupon_using_history add constraint fk_coupon_using_history_order foreign key (order_id) references "order"(id) on delete set null on update cascade;
alter table coupon_using_history drop constraint if exists fk_coupon_using_history_coupon;
alter table coupon_using_history add constraint fk_coupon_using_history_coupon foreign key (coupon_id) references coupon(id) on delete set null on update cascade;

alter table invitation_visit_log drop constraint if exists fk_invitation_visit_log_invitation;
alter table invitation_visit_log add constraint fk_invitation_visit_log_invitation foreign key (invitation_id) references invitation(id) on delete cascade on update cascade;

alter table invitation_rsvp_answer drop constraint if exists fk_invitation_rsvp_answer_invitation;
alter table invitation_rsvp_answer add constraint fk_invitation_rsvp_answer_invitation foreign key (invitation_id) references invitation(id) on delete cascade on update cascade;

alter table widget_sticker drop constraint if exists fk_widget_sticker_widget;
alter table widget_sticker add constraint fk_widget_sticker_widget foreign key (widget_id) references widget(id) on delete cascade on update cascade;


