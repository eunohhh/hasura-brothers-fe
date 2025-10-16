import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  bigint: { input: any; output: any; }
  inet: { input: any; output: any; }
  jsonb: { input: Record<string, any>; output: Record<string, any>; }
  numeric: { input: number; output: number; }
  timestamptz: { input: string; output: string; }
  uuid: { input: string; output: string; }
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']['input']>;
  _gt?: InputMaybe<Scalars['Boolean']['input']>;
  _gte?: InputMaybe<Scalars['Boolean']['input']>;
  _in?: InputMaybe<Array<Scalars['Boolean']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Boolean']['input']>;
  _lte?: InputMaybe<Scalars['Boolean']['input']>;
  _neq?: InputMaybe<Scalars['Boolean']['input']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']['input']>>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']['input']>;
  _gt?: InputMaybe<Scalars['Int']['input']>;
  _gte?: InputMaybe<Scalars['Int']['input']>;
  _in?: InputMaybe<Array<Scalars['Int']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Int']['input']>;
  _lte?: InputMaybe<Scalars['Int']['input']>;
  _neq?: InputMaybe<Scalars['Int']['input']>;
  _nin?: InputMaybe<Array<Scalars['Int']['input']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']['input']>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']['input']>;
  _lt?: InputMaybe<Scalars['String']['input']>;
  _lte?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']['input']>;
};

/** Boolean expression to compare columns of type "bigint". All fields are combined with logical 'AND'. */
export type Bigint_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['bigint']['input']>;
  _gt?: InputMaybe<Scalars['bigint']['input']>;
  _gte?: InputMaybe<Scalars['bigint']['input']>;
  _in?: InputMaybe<Array<Scalars['bigint']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['bigint']['input']>;
  _lte?: InputMaybe<Scalars['bigint']['input']>;
  _neq?: InputMaybe<Scalars['bigint']['input']>;
  _nin?: InputMaybe<Array<Scalars['bigint']['input']>>;
};

/** columns and relationships of "coupon" */
export type Coupon = {
  __typename?: 'coupon';
  code?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  coupon_using_histories: Array<Coupon_Using_History>;
  /** An aggregate relationship */
  coupon_using_histories_aggregate: Coupon_Using_History_Aggregate;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  discount_percent?: Maybe<Scalars['Int']['output']>;
  expiring_date?: Maybe<Scalars['timestamptz']['output']>;
  group?: Maybe<Scalars['String']['output']>;
  id: Scalars['uuid']['output'];
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  used_at?: Maybe<Scalars['timestamptz']['output']>;
};


/** columns and relationships of "coupon" */
export type CouponCoupon_Using_HistoriesArgs = {
  distinct_on?: InputMaybe<Array<Coupon_Using_History_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Coupon_Using_History_Order_By>>;
  where?: InputMaybe<Coupon_Using_History_Bool_Exp>;
};


/** columns and relationships of "coupon" */
export type CouponCoupon_Using_Histories_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Coupon_Using_History_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Coupon_Using_History_Order_By>>;
  where?: InputMaybe<Coupon_Using_History_Bool_Exp>;
};

/** aggregated selection of "coupon" */
export type Coupon_Aggregate = {
  __typename?: 'coupon_aggregate';
  aggregate?: Maybe<Coupon_Aggregate_Fields>;
  nodes: Array<Coupon>;
};

/** aggregate fields of "coupon" */
export type Coupon_Aggregate_Fields = {
  __typename?: 'coupon_aggregate_fields';
  avg?: Maybe<Coupon_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Coupon_Max_Fields>;
  min?: Maybe<Coupon_Min_Fields>;
  stddev?: Maybe<Coupon_Stddev_Fields>;
  stddev_pop?: Maybe<Coupon_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Coupon_Stddev_Samp_Fields>;
  sum?: Maybe<Coupon_Sum_Fields>;
  var_pop?: Maybe<Coupon_Var_Pop_Fields>;
  var_samp?: Maybe<Coupon_Var_Samp_Fields>;
  variance?: Maybe<Coupon_Variance_Fields>;
};


/** aggregate fields of "coupon" */
export type Coupon_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Coupon_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Coupon_Avg_Fields = {
  __typename?: 'coupon_avg_fields';
  discount_percent?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "coupon". All fields are combined with a logical 'AND'. */
export type Coupon_Bool_Exp = {
  _and?: InputMaybe<Array<Coupon_Bool_Exp>>;
  _not?: InputMaybe<Coupon_Bool_Exp>;
  _or?: InputMaybe<Array<Coupon_Bool_Exp>>;
  code?: InputMaybe<String_Comparison_Exp>;
  coupon_using_histories?: InputMaybe<Coupon_Using_History_Bool_Exp>;
  coupon_using_histories_aggregate?: InputMaybe<Coupon_Using_History_Aggregate_Bool_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  discount_percent?: InputMaybe<Int_Comparison_Exp>;
  expiring_date?: InputMaybe<Timestamptz_Comparison_Exp>;
  group?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  used_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "coupon" */
export enum Coupon_Constraint {
  /** unique or primary key constraint on columns "code" */
  CouponCodeIdx = 'coupon_code_idx',
  /** unique or primary key constraint on columns "id" */
  CouponPkey = 'coupon_pkey'
}

/** input type for incrementing numeric columns in table "coupon" */
export type Coupon_Inc_Input = {
  discount_percent?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "coupon" */
export type Coupon_Insert_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  coupon_using_histories?: InputMaybe<Coupon_Using_History_Arr_Rel_Insert_Input>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  discount_percent?: InputMaybe<Scalars['Int']['input']>;
  expiring_date?: InputMaybe<Scalars['timestamptz']['input']>;
  group?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  used_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Coupon_Max_Fields = {
  __typename?: 'coupon_max_fields';
  code?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  discount_percent?: Maybe<Scalars['Int']['output']>;
  expiring_date?: Maybe<Scalars['timestamptz']['output']>;
  group?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  used_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregate min on columns */
export type Coupon_Min_Fields = {
  __typename?: 'coupon_min_fields';
  code?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  discount_percent?: Maybe<Scalars['Int']['output']>;
  expiring_date?: Maybe<Scalars['timestamptz']['output']>;
  group?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  used_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** response of any mutation on the table "coupon" */
export type Coupon_Mutation_Response = {
  __typename?: 'coupon_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Coupon>;
};

/** input type for inserting object relation for remote table "coupon" */
export type Coupon_Obj_Rel_Insert_Input = {
  data: Coupon_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Coupon_On_Conflict>;
};

/** on_conflict condition type for table "coupon" */
export type Coupon_On_Conflict = {
  constraint: Coupon_Constraint;
  update_columns?: Array<Coupon_Update_Column>;
  where?: InputMaybe<Coupon_Bool_Exp>;
};

/** Ordering options when selecting data from "coupon". */
export type Coupon_Order_By = {
  code?: InputMaybe<Order_By>;
  coupon_using_histories_aggregate?: InputMaybe<Coupon_Using_History_Aggregate_Order_By>;
  created_at?: InputMaybe<Order_By>;
  discount_percent?: InputMaybe<Order_By>;
  expiring_date?: InputMaybe<Order_By>;
  group?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  used_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: coupon */
export type Coupon_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "coupon" */
export enum Coupon_Select_Column {
  /** column name */
  Code = 'code',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DiscountPercent = 'discount_percent',
  /** column name */
  ExpiringDate = 'expiring_date',
  /** column name */
  Group = 'group',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UsedAt = 'used_at'
}

/** input type for updating data in table "coupon" */
export type Coupon_Set_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  discount_percent?: InputMaybe<Scalars['Int']['input']>;
  expiring_date?: InputMaybe<Scalars['timestamptz']['input']>;
  group?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  used_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate stddev on columns */
export type Coupon_Stddev_Fields = {
  __typename?: 'coupon_stddev_fields';
  discount_percent?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Coupon_Stddev_Pop_Fields = {
  __typename?: 'coupon_stddev_pop_fields';
  discount_percent?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Coupon_Stddev_Samp_Fields = {
  __typename?: 'coupon_stddev_samp_fields';
  discount_percent?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "coupon" */
export type Coupon_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Coupon_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Coupon_Stream_Cursor_Value_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  discount_percent?: InputMaybe<Scalars['Int']['input']>;
  expiring_date?: InputMaybe<Scalars['timestamptz']['input']>;
  group?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  used_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate sum on columns */
export type Coupon_Sum_Fields = {
  __typename?: 'coupon_sum_fields';
  discount_percent?: Maybe<Scalars['Int']['output']>;
};

/** update columns of table "coupon" */
export enum Coupon_Update_Column {
  /** column name */
  Code = 'code',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  DiscountPercent = 'discount_percent',
  /** column name */
  ExpiringDate = 'expiring_date',
  /** column name */
  Group = 'group',
  /** column name */
  Id = 'id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UsedAt = 'used_at'
}

export type Coupon_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Coupon_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Coupon_Set_Input>;
  /** filter the rows which have to be updated */
  where: Coupon_Bool_Exp;
};

/** columns and relationships of "coupon_using_history" */
export type Coupon_Using_History = {
  __typename?: 'coupon_using_history';
  /** An object relationship */
  coupon?: Maybe<Coupon>;
  coupon_id?: Maybe<Scalars['uuid']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id: Scalars['uuid']['output'];
  /** An object relationship */
  invitation?: Maybe<Invitation>;
  invitation_id?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  order?: Maybe<Order>;
  order_id?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "coupon_using_history" */
export type Coupon_Using_History_Aggregate = {
  __typename?: 'coupon_using_history_aggregate';
  aggregate?: Maybe<Coupon_Using_History_Aggregate_Fields>;
  nodes: Array<Coupon_Using_History>;
};

export type Coupon_Using_History_Aggregate_Bool_Exp = {
  count?: InputMaybe<Coupon_Using_History_Aggregate_Bool_Exp_Count>;
};

export type Coupon_Using_History_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Coupon_Using_History_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Coupon_Using_History_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "coupon_using_history" */
export type Coupon_Using_History_Aggregate_Fields = {
  __typename?: 'coupon_using_history_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Coupon_Using_History_Max_Fields>;
  min?: Maybe<Coupon_Using_History_Min_Fields>;
};


/** aggregate fields of "coupon_using_history" */
export type Coupon_Using_History_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Coupon_Using_History_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "coupon_using_history" */
export type Coupon_Using_History_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Coupon_Using_History_Max_Order_By>;
  min?: InputMaybe<Coupon_Using_History_Min_Order_By>;
};

/** input type for inserting array relation for remote table "coupon_using_history" */
export type Coupon_Using_History_Arr_Rel_Insert_Input = {
  data: Array<Coupon_Using_History_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Coupon_Using_History_On_Conflict>;
};

/** Boolean expression to filter rows from the table "coupon_using_history". All fields are combined with a logical 'AND'. */
export type Coupon_Using_History_Bool_Exp = {
  _and?: InputMaybe<Array<Coupon_Using_History_Bool_Exp>>;
  _not?: InputMaybe<Coupon_Using_History_Bool_Exp>;
  _or?: InputMaybe<Array<Coupon_Using_History_Bool_Exp>>;
  coupon?: InputMaybe<Coupon_Bool_Exp>;
  coupon_id?: InputMaybe<Uuid_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  invitation?: InputMaybe<Invitation_Bool_Exp>;
  invitation_id?: InputMaybe<Uuid_Comparison_Exp>;
  order?: InputMaybe<Order_Bool_Exp>;
  order_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "coupon_using_history" */
export enum Coupon_Using_History_Constraint {
  /** unique or primary key constraint on columns "coupon_id" */
  CouponUsingHistoryCouponIdIdx = 'coupon_using_history_coupon_id_idx',
  /** unique or primary key constraint on columns "id" */
  CouponUsingHistoryPkey = 'coupon_using_history_pkey'
}

/** input type for inserting data into table "coupon_using_history" */
export type Coupon_Using_History_Insert_Input = {
  coupon?: InputMaybe<Coupon_Obj_Rel_Insert_Input>;
  coupon_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  invitation?: InputMaybe<Invitation_Obj_Rel_Insert_Input>;
  invitation_id?: InputMaybe<Scalars['uuid']['input']>;
  order?: InputMaybe<Order_Obj_Rel_Insert_Input>;
  order_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Coupon_Using_History_Max_Fields = {
  __typename?: 'coupon_using_history_max_fields';
  coupon_id?: Maybe<Scalars['uuid']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  invitation_id?: Maybe<Scalars['uuid']['output']>;
  order_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "coupon_using_history" */
export type Coupon_Using_History_Max_Order_By = {
  coupon_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  invitation_id?: InputMaybe<Order_By>;
  order_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Coupon_Using_History_Min_Fields = {
  __typename?: 'coupon_using_history_min_fields';
  coupon_id?: Maybe<Scalars['uuid']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  invitation_id?: Maybe<Scalars['uuid']['output']>;
  order_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "coupon_using_history" */
export type Coupon_Using_History_Min_Order_By = {
  coupon_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  invitation_id?: InputMaybe<Order_By>;
  order_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "coupon_using_history" */
export type Coupon_Using_History_Mutation_Response = {
  __typename?: 'coupon_using_history_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Coupon_Using_History>;
};

/** on_conflict condition type for table "coupon_using_history" */
export type Coupon_Using_History_On_Conflict = {
  constraint: Coupon_Using_History_Constraint;
  update_columns?: Array<Coupon_Using_History_Update_Column>;
  where?: InputMaybe<Coupon_Using_History_Bool_Exp>;
};

/** Ordering options when selecting data from "coupon_using_history". */
export type Coupon_Using_History_Order_By = {
  coupon?: InputMaybe<Coupon_Order_By>;
  coupon_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  invitation?: InputMaybe<Invitation_Order_By>;
  invitation_id?: InputMaybe<Order_By>;
  order?: InputMaybe<Order_Order_By>;
  order_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: coupon_using_history */
export type Coupon_Using_History_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "coupon_using_history" */
export enum Coupon_Using_History_Select_Column {
  /** column name */
  CouponId = 'coupon_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  InvitationId = 'invitation_id',
  /** column name */
  OrderId = 'order_id'
}

/** input type for updating data in table "coupon_using_history" */
export type Coupon_Using_History_Set_Input = {
  coupon_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  invitation_id?: InputMaybe<Scalars['uuid']['input']>;
  order_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "coupon_using_history" */
export type Coupon_Using_History_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Coupon_Using_History_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Coupon_Using_History_Stream_Cursor_Value_Input = {
  coupon_id?: InputMaybe<Scalars['uuid']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  invitation_id?: InputMaybe<Scalars['uuid']['input']>;
  order_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "coupon_using_history" */
export enum Coupon_Using_History_Update_Column {
  /** column name */
  CouponId = 'coupon_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  InvitationId = 'invitation_id',
  /** column name */
  OrderId = 'order_id'
}

export type Coupon_Using_History_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Coupon_Using_History_Set_Input>;
  /** filter the rows which have to be updated */
  where: Coupon_Using_History_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Coupon_Var_Pop_Fields = {
  __typename?: 'coupon_var_pop_fields';
  discount_percent?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Coupon_Var_Samp_Fields = {
  __typename?: 'coupon_var_samp_fields';
  discount_percent?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Coupon_Variance_Fields = {
  __typename?: 'coupon_variance_fields';
  discount_percent?: Maybe<Scalars['Float']['output']>;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

/** Boolean expression to compare columns of type "inet". All fields are combined with logical 'AND'. */
export type Inet_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['inet']['input']>;
  _gt?: InputMaybe<Scalars['inet']['input']>;
  _gte?: InputMaybe<Scalars['inet']['input']>;
  _in?: InputMaybe<Array<Scalars['inet']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['inet']['input']>;
  _lte?: InputMaybe<Scalars['inet']['input']>;
  _neq?: InputMaybe<Scalars['inet']['input']>;
  _nin?: InputMaybe<Array<Scalars['inet']['input']>>;
};

/** columns and relationships of "invitation" */
export type Invitation = {
  __typename?: 'invitation';
  address?: Maybe<Scalars['String']['output']>;
  brand_color?: Maybe<Scalars['String']['output']>;
  coord?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  coupon_using_histories: Array<Coupon_Using_History>;
  /** An aggregate relationship */
  coupon_using_histories_aggregate: Coupon_Using_History_Aggregate;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  event_at?: Maybe<Scalars['timestamptz']['output']>;
  font?: Maybe<Scalars['String']['output']>;
  full_day_schedule?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['uuid']['output'];
  /** An array relationship */
  invitation_attachments: Array<Invitation_Attachment>;
  /** An aggregate relationship */
  invitation_attachments_aggregate: Invitation_Attachment_Aggregate;
  /** An array relationship */
  invitation_comments: Array<Invitation_Comment>;
  /** An aggregate relationship */
  invitation_comments_aggregate: Invitation_Comment_Aggregate;
  /** An array relationship */
  invitation_editors: Array<Invitation_Editor>;
  /** An aggregate relationship */
  invitation_editors_aggregate: Invitation_Editor_Aggregate;
  /** An array relationship */
  invitation_owners: Array<Invitation_Owner>;
  /** An aggregate relationship */
  invitation_owners_aggregate: Invitation_Owner_Aggregate;
  /** An array relationship */
  invitation_rsvp_answers: Array<Invitation_Rsvp_Answer>;
  /** An aggregate relationship */
  invitation_rsvp_answers_aggregate: Invitation_Rsvp_Answer_Aggregate;
  /** An array relationship */
  invitation_shares: Array<Invitation_Share>;
  /** An aggregate relationship */
  invitation_shares_aggregate: Invitation_Share_Aggregate;
  /** An array relationship */
  invitation_visit_logs: Array<Invitation_Visit_Log>;
  /** An aggregate relationship */
  invitation_visit_logs_aggregate: Invitation_Visit_Log_Aggregate;
  layout_type?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  orders: Array<Order>;
  /** An aggregate relationship */
  orders_aggregate: Order_Aggregate;
  place_detail?: Maybe<Scalars['String']['output']>;
  place_name?: Maybe<Scalars['String']['output']>;
  removed_at?: Maybe<Scalars['timestamptz']['output']>;
  road_address?: Maybe<Scalars['String']['output']>;
  /** An array relationship */
  templates: Array<Template>;
  /** An aggregate relationship */
  templates_aggregate: Template_Aggregate;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  /** An array relationship */
  widgets: Array<Widget>;
  /** An aggregate relationship */
  widgets_aggregate: Widget_Aggregate;
};


/** columns and relationships of "invitation" */
export type InvitationCoupon_Using_HistoriesArgs = {
  distinct_on?: InputMaybe<Array<Coupon_Using_History_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Coupon_Using_History_Order_By>>;
  where?: InputMaybe<Coupon_Using_History_Bool_Exp>;
};


/** columns and relationships of "invitation" */
export type InvitationCoupon_Using_Histories_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Coupon_Using_History_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Coupon_Using_History_Order_By>>;
  where?: InputMaybe<Coupon_Using_History_Bool_Exp>;
};


/** columns and relationships of "invitation" */
export type InvitationInvitation_AttachmentsArgs = {
  distinct_on?: InputMaybe<Array<Invitation_Attachment_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Invitation_Attachment_Order_By>>;
  where?: InputMaybe<Invitation_Attachment_Bool_Exp>;
};


/** columns and relationships of "invitation" */
export type InvitationInvitation_Attachments_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Invitation_Attachment_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Invitation_Attachment_Order_By>>;
  where?: InputMaybe<Invitation_Attachment_Bool_Exp>;
};


/** columns and relationships of "invitation" */
export type InvitationInvitation_CommentsArgs = {
  distinct_on?: InputMaybe<Array<Invitation_Comment_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Invitation_Comment_Order_By>>;
  where?: InputMaybe<Invitation_Comment_Bool_Exp>;
};


/** columns and relationships of "invitation" */
export type InvitationInvitation_Comments_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Invitation_Comment_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Invitation_Comment_Order_By>>;
  where?: InputMaybe<Invitation_Comment_Bool_Exp>;
};


/** columns and relationships of "invitation" */
export type InvitationInvitation_EditorsArgs = {
  distinct_on?: InputMaybe<Array<Invitation_Editor_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Invitation_Editor_Order_By>>;
  where?: InputMaybe<Invitation_Editor_Bool_Exp>;
};


/** columns and relationships of "invitation" */
export type InvitationInvitation_Editors_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Invitation_Editor_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Invitation_Editor_Order_By>>;
  where?: InputMaybe<Invitation_Editor_Bool_Exp>;
};


/** columns and relationships of "invitation" */
export type InvitationInvitation_OwnersArgs = {
  distinct_on?: InputMaybe<Array<Invitation_Owner_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Invitation_Owner_Order_By>>;
  where?: InputMaybe<Invitation_Owner_Bool_Exp>;
};


/** columns and relationships of "invitation" */
export type InvitationInvitation_Owners_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Invitation_Owner_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Invitation_Owner_Order_By>>;
  where?: InputMaybe<Invitation_Owner_Bool_Exp>;
};


/** columns and relationships of "invitation" */
export type InvitationInvitation_Rsvp_AnswersArgs = {
  distinct_on?: InputMaybe<Array<Invitation_Rsvp_Answer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Invitation_Rsvp_Answer_Order_By>>;
  where?: InputMaybe<Invitation_Rsvp_Answer_Bool_Exp>;
};


/** columns and relationships of "invitation" */
export type InvitationInvitation_Rsvp_Answers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Invitation_Rsvp_Answer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Invitation_Rsvp_Answer_Order_By>>;
  where?: InputMaybe<Invitation_Rsvp_Answer_Bool_Exp>;
};


/** columns and relationships of "invitation" */
export type InvitationInvitation_SharesArgs = {
  distinct_on?: InputMaybe<Array<Invitation_Share_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Invitation_Share_Order_By>>;
  where?: InputMaybe<Invitation_Share_Bool_Exp>;
};


/** columns and relationships of "invitation" */
export type InvitationInvitation_Shares_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Invitation_Share_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Invitation_Share_Order_By>>;
  where?: InputMaybe<Invitation_Share_Bool_Exp>;
};


/** columns and relationships of "invitation" */
export type InvitationInvitation_Visit_LogsArgs = {
  distinct_on?: InputMaybe<Array<Invitation_Visit_Log_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Invitation_Visit_Log_Order_By>>;
  where?: InputMaybe<Invitation_Visit_Log_Bool_Exp>;
};


/** columns and relationships of "invitation" */
export type InvitationInvitation_Visit_Logs_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Invitation_Visit_Log_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Invitation_Visit_Log_Order_By>>;
  where?: InputMaybe<Invitation_Visit_Log_Bool_Exp>;
};


/** columns and relationships of "invitation" */
export type InvitationOrdersArgs = {
  distinct_on?: InputMaybe<Array<Order_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Order_Order_By>>;
  where?: InputMaybe<Order_Bool_Exp>;
};


/** columns and relationships of "invitation" */
export type InvitationOrders_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Order_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Order_Order_By>>;
  where?: InputMaybe<Order_Bool_Exp>;
};


/** columns and relationships of "invitation" */
export type InvitationTemplatesArgs = {
  distinct_on?: InputMaybe<Array<Template_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Template_Order_By>>;
  where?: InputMaybe<Template_Bool_Exp>;
};


/** columns and relationships of "invitation" */
export type InvitationTemplates_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Template_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Template_Order_By>>;
  where?: InputMaybe<Template_Bool_Exp>;
};


/** columns and relationships of "invitation" */
export type InvitationWidgetsArgs = {
  distinct_on?: InputMaybe<Array<Widget_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Widget_Order_By>>;
  where?: InputMaybe<Widget_Bool_Exp>;
};


/** columns and relationships of "invitation" */
export type InvitationWidgets_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Widget_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Widget_Order_By>>;
  where?: InputMaybe<Widget_Bool_Exp>;
};

/** aggregated selection of "invitation" */
export type Invitation_Aggregate = {
  __typename?: 'invitation_aggregate';
  aggregate?: Maybe<Invitation_Aggregate_Fields>;
  nodes: Array<Invitation>;
};

/** aggregate fields of "invitation" */
export type Invitation_Aggregate_Fields = {
  __typename?: 'invitation_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Invitation_Max_Fields>;
  min?: Maybe<Invitation_Min_Fields>;
};


/** aggregate fields of "invitation" */
export type Invitation_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Invitation_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** columns and relationships of "invitation_attachment" */
export type Invitation_Attachment = {
  __typename?: 'invitation_attachment';
  bucket?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  height?: Maybe<Scalars['Int']['output']>;
  id: Scalars['uuid']['output'];
  /** An object relationship */
  invitation?: Maybe<Invitation>;
  invitation_id?: Maybe<Scalars['uuid']['output']>;
  key?: Maybe<Scalars['String']['output']>;
  mime_type?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  user?: Maybe<User>;
  user_id?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  widget?: Maybe<Widget>;
  widget_id?: Maybe<Scalars['uuid']['output']>;
  width?: Maybe<Scalars['Int']['output']>;
};

/** aggregated selection of "invitation_attachment" */
export type Invitation_Attachment_Aggregate = {
  __typename?: 'invitation_attachment_aggregate';
  aggregate?: Maybe<Invitation_Attachment_Aggregate_Fields>;
  nodes: Array<Invitation_Attachment>;
};

export type Invitation_Attachment_Aggregate_Bool_Exp = {
  count?: InputMaybe<Invitation_Attachment_Aggregate_Bool_Exp_Count>;
};

export type Invitation_Attachment_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Invitation_Attachment_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Invitation_Attachment_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "invitation_attachment" */
export type Invitation_Attachment_Aggregate_Fields = {
  __typename?: 'invitation_attachment_aggregate_fields';
  avg?: Maybe<Invitation_Attachment_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Invitation_Attachment_Max_Fields>;
  min?: Maybe<Invitation_Attachment_Min_Fields>;
  stddev?: Maybe<Invitation_Attachment_Stddev_Fields>;
  stddev_pop?: Maybe<Invitation_Attachment_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Invitation_Attachment_Stddev_Samp_Fields>;
  sum?: Maybe<Invitation_Attachment_Sum_Fields>;
  var_pop?: Maybe<Invitation_Attachment_Var_Pop_Fields>;
  var_samp?: Maybe<Invitation_Attachment_Var_Samp_Fields>;
  variance?: Maybe<Invitation_Attachment_Variance_Fields>;
};


/** aggregate fields of "invitation_attachment" */
export type Invitation_Attachment_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Invitation_Attachment_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "invitation_attachment" */
export type Invitation_Attachment_Aggregate_Order_By = {
  avg?: InputMaybe<Invitation_Attachment_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Invitation_Attachment_Max_Order_By>;
  min?: InputMaybe<Invitation_Attachment_Min_Order_By>;
  stddev?: InputMaybe<Invitation_Attachment_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Invitation_Attachment_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Invitation_Attachment_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Invitation_Attachment_Sum_Order_By>;
  var_pop?: InputMaybe<Invitation_Attachment_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Invitation_Attachment_Var_Samp_Order_By>;
  variance?: InputMaybe<Invitation_Attachment_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "invitation_attachment" */
export type Invitation_Attachment_Arr_Rel_Insert_Input = {
  data: Array<Invitation_Attachment_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Invitation_Attachment_On_Conflict>;
};

/** aggregate avg on columns */
export type Invitation_Attachment_Avg_Fields = {
  __typename?: 'invitation_attachment_avg_fields';
  height?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "invitation_attachment" */
export type Invitation_Attachment_Avg_Order_By = {
  height?: InputMaybe<Order_By>;
  width?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "invitation_attachment". All fields are combined with a logical 'AND'. */
export type Invitation_Attachment_Bool_Exp = {
  _and?: InputMaybe<Array<Invitation_Attachment_Bool_Exp>>;
  _not?: InputMaybe<Invitation_Attachment_Bool_Exp>;
  _or?: InputMaybe<Array<Invitation_Attachment_Bool_Exp>>;
  bucket?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  height?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  invitation?: InputMaybe<Invitation_Bool_Exp>;
  invitation_id?: InputMaybe<Uuid_Comparison_Exp>;
  key?: InputMaybe<String_Comparison_Exp>;
  mime_type?: InputMaybe<String_Comparison_Exp>;
  type?: InputMaybe<String_Comparison_Exp>;
  user?: InputMaybe<User_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
  widget?: InputMaybe<Widget_Bool_Exp>;
  widget_id?: InputMaybe<Uuid_Comparison_Exp>;
  width?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "invitation_attachment" */
export enum Invitation_Attachment_Constraint {
  /** unique or primary key constraint on columns "id" */
  InvitationAttachmentPkey = 'invitation_attachment_pkey'
}

/** input type for incrementing numeric columns in table "invitation_attachment" */
export type Invitation_Attachment_Inc_Input = {
  height?: InputMaybe<Scalars['Int']['input']>;
  width?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "invitation_attachment" */
export type Invitation_Attachment_Insert_Input = {
  bucket?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  height?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  invitation?: InputMaybe<Invitation_Obj_Rel_Insert_Input>;
  invitation_id?: InputMaybe<Scalars['uuid']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
  mime_type?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  user?: InputMaybe<User_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
  widget?: InputMaybe<Widget_Obj_Rel_Insert_Input>;
  widget_id?: InputMaybe<Scalars['uuid']['input']>;
  width?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate max on columns */
export type Invitation_Attachment_Max_Fields = {
  __typename?: 'invitation_attachment_max_fields';
  bucket?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  height?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  invitation_id?: Maybe<Scalars['uuid']['output']>;
  key?: Maybe<Scalars['String']['output']>;
  mime_type?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
  widget_id?: Maybe<Scalars['uuid']['output']>;
  width?: Maybe<Scalars['Int']['output']>;
};

/** order by max() on columns of table "invitation_attachment" */
export type Invitation_Attachment_Max_Order_By = {
  bucket?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  height?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  invitation_id?: InputMaybe<Order_By>;
  key?: InputMaybe<Order_By>;
  mime_type?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
  widget_id?: InputMaybe<Order_By>;
  width?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Invitation_Attachment_Min_Fields = {
  __typename?: 'invitation_attachment_min_fields';
  bucket?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  height?: Maybe<Scalars['Int']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  invitation_id?: Maybe<Scalars['uuid']['output']>;
  key?: Maybe<Scalars['String']['output']>;
  mime_type?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
  widget_id?: Maybe<Scalars['uuid']['output']>;
  width?: Maybe<Scalars['Int']['output']>;
};

/** order by min() on columns of table "invitation_attachment" */
export type Invitation_Attachment_Min_Order_By = {
  bucket?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  height?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  invitation_id?: InputMaybe<Order_By>;
  key?: InputMaybe<Order_By>;
  mime_type?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
  widget_id?: InputMaybe<Order_By>;
  width?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "invitation_attachment" */
export type Invitation_Attachment_Mutation_Response = {
  __typename?: 'invitation_attachment_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Invitation_Attachment>;
};

/** on_conflict condition type for table "invitation_attachment" */
export type Invitation_Attachment_On_Conflict = {
  constraint: Invitation_Attachment_Constraint;
  update_columns?: Array<Invitation_Attachment_Update_Column>;
  where?: InputMaybe<Invitation_Attachment_Bool_Exp>;
};

/** Ordering options when selecting data from "invitation_attachment". */
export type Invitation_Attachment_Order_By = {
  bucket?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  height?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  invitation?: InputMaybe<Invitation_Order_By>;
  invitation_id?: InputMaybe<Order_By>;
  key?: InputMaybe<Order_By>;
  mime_type?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  user?: InputMaybe<User_Order_By>;
  user_id?: InputMaybe<Order_By>;
  widget?: InputMaybe<Widget_Order_By>;
  widget_id?: InputMaybe<Order_By>;
  width?: InputMaybe<Order_By>;
};

/** primary key columns input for table: invitation_attachment */
export type Invitation_Attachment_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "invitation_attachment" */
export enum Invitation_Attachment_Select_Column {
  /** column name */
  Bucket = 'bucket',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Height = 'height',
  /** column name */
  Id = 'id',
  /** column name */
  InvitationId = 'invitation_id',
  /** column name */
  Key = 'key',
  /** column name */
  MimeType = 'mime_type',
  /** column name */
  Type = 'type',
  /** column name */
  UserId = 'user_id',
  /** column name */
  WidgetId = 'widget_id',
  /** column name */
  Width = 'width'
}

/** input type for updating data in table "invitation_attachment" */
export type Invitation_Attachment_Set_Input = {
  bucket?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  height?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  invitation_id?: InputMaybe<Scalars['uuid']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
  mime_type?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
  widget_id?: InputMaybe<Scalars['uuid']['input']>;
  width?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate stddev on columns */
export type Invitation_Attachment_Stddev_Fields = {
  __typename?: 'invitation_attachment_stddev_fields';
  height?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "invitation_attachment" */
export type Invitation_Attachment_Stddev_Order_By = {
  height?: InputMaybe<Order_By>;
  width?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Invitation_Attachment_Stddev_Pop_Fields = {
  __typename?: 'invitation_attachment_stddev_pop_fields';
  height?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "invitation_attachment" */
export type Invitation_Attachment_Stddev_Pop_Order_By = {
  height?: InputMaybe<Order_By>;
  width?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Invitation_Attachment_Stddev_Samp_Fields = {
  __typename?: 'invitation_attachment_stddev_samp_fields';
  height?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "invitation_attachment" */
export type Invitation_Attachment_Stddev_Samp_Order_By = {
  height?: InputMaybe<Order_By>;
  width?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "invitation_attachment" */
export type Invitation_Attachment_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Invitation_Attachment_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Invitation_Attachment_Stream_Cursor_Value_Input = {
  bucket?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  height?: InputMaybe<Scalars['Int']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  invitation_id?: InputMaybe<Scalars['uuid']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
  mime_type?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
  widget_id?: InputMaybe<Scalars['uuid']['input']>;
  width?: InputMaybe<Scalars['Int']['input']>;
};

/** aggregate sum on columns */
export type Invitation_Attachment_Sum_Fields = {
  __typename?: 'invitation_attachment_sum_fields';
  height?: Maybe<Scalars['Int']['output']>;
  width?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "invitation_attachment" */
export type Invitation_Attachment_Sum_Order_By = {
  height?: InputMaybe<Order_By>;
  width?: InputMaybe<Order_By>;
};

/** update columns of table "invitation_attachment" */
export enum Invitation_Attachment_Update_Column {
  /** column name */
  Bucket = 'bucket',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Height = 'height',
  /** column name */
  Id = 'id',
  /** column name */
  InvitationId = 'invitation_id',
  /** column name */
  Key = 'key',
  /** column name */
  MimeType = 'mime_type',
  /** column name */
  Type = 'type',
  /** column name */
  UserId = 'user_id',
  /** column name */
  WidgetId = 'widget_id',
  /** column name */
  Width = 'width'
}

export type Invitation_Attachment_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Invitation_Attachment_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Invitation_Attachment_Set_Input>;
  /** filter the rows which have to be updated */
  where: Invitation_Attachment_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Invitation_Attachment_Var_Pop_Fields = {
  __typename?: 'invitation_attachment_var_pop_fields';
  height?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "invitation_attachment" */
export type Invitation_Attachment_Var_Pop_Order_By = {
  height?: InputMaybe<Order_By>;
  width?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Invitation_Attachment_Var_Samp_Fields = {
  __typename?: 'invitation_attachment_var_samp_fields';
  height?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "invitation_attachment" */
export type Invitation_Attachment_Var_Samp_Order_By = {
  height?: InputMaybe<Order_By>;
  width?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Invitation_Attachment_Variance_Fields = {
  __typename?: 'invitation_attachment_variance_fields';
  height?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "invitation_attachment" */
export type Invitation_Attachment_Variance_Order_By = {
  height?: InputMaybe<Order_By>;
  width?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "invitation". All fields are combined with a logical 'AND'. */
export type Invitation_Bool_Exp = {
  _and?: InputMaybe<Array<Invitation_Bool_Exp>>;
  _not?: InputMaybe<Invitation_Bool_Exp>;
  _or?: InputMaybe<Array<Invitation_Bool_Exp>>;
  address?: InputMaybe<String_Comparison_Exp>;
  brand_color?: InputMaybe<String_Comparison_Exp>;
  coord?: InputMaybe<String_Comparison_Exp>;
  coupon_using_histories?: InputMaybe<Coupon_Using_History_Bool_Exp>;
  coupon_using_histories_aggregate?: InputMaybe<Coupon_Using_History_Aggregate_Bool_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  event_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  font?: InputMaybe<String_Comparison_Exp>;
  full_day_schedule?: InputMaybe<Boolean_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  invitation_attachments?: InputMaybe<Invitation_Attachment_Bool_Exp>;
  invitation_attachments_aggregate?: InputMaybe<Invitation_Attachment_Aggregate_Bool_Exp>;
  invitation_comments?: InputMaybe<Invitation_Comment_Bool_Exp>;
  invitation_comments_aggregate?: InputMaybe<Invitation_Comment_Aggregate_Bool_Exp>;
  invitation_editors?: InputMaybe<Invitation_Editor_Bool_Exp>;
  invitation_editors_aggregate?: InputMaybe<Invitation_Editor_Aggregate_Bool_Exp>;
  invitation_owners?: InputMaybe<Invitation_Owner_Bool_Exp>;
  invitation_owners_aggregate?: InputMaybe<Invitation_Owner_Aggregate_Bool_Exp>;
  invitation_rsvp_answers?: InputMaybe<Invitation_Rsvp_Answer_Bool_Exp>;
  invitation_rsvp_answers_aggregate?: InputMaybe<Invitation_Rsvp_Answer_Aggregate_Bool_Exp>;
  invitation_shares?: InputMaybe<Invitation_Share_Bool_Exp>;
  invitation_shares_aggregate?: InputMaybe<Invitation_Share_Aggregate_Bool_Exp>;
  invitation_visit_logs?: InputMaybe<Invitation_Visit_Log_Bool_Exp>;
  invitation_visit_logs_aggregate?: InputMaybe<Invitation_Visit_Log_Aggregate_Bool_Exp>;
  layout_type?: InputMaybe<String_Comparison_Exp>;
  orders?: InputMaybe<Order_Bool_Exp>;
  orders_aggregate?: InputMaybe<Order_Aggregate_Bool_Exp>;
  place_detail?: InputMaybe<String_Comparison_Exp>;
  place_name?: InputMaybe<String_Comparison_Exp>;
  removed_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  road_address?: InputMaybe<String_Comparison_Exp>;
  templates?: InputMaybe<Template_Bool_Exp>;
  templates_aggregate?: InputMaybe<Template_Aggregate_Bool_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  widgets?: InputMaybe<Widget_Bool_Exp>;
  widgets_aggregate?: InputMaybe<Widget_Aggregate_Bool_Exp>;
};

/** columns and relationships of "invitation_comment" */
export type Invitation_Comment = {
  __typename?: 'invitation_comment';
  author?: Maybe<Scalars['String']['output']>;
  author_profile_image?: Maybe<Scalars['String']['output']>;
  body?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id: Scalars['uuid']['output'];
  /** An object relationship */
  invitation?: Maybe<Invitation>;
  /** An object relationship */
  invitation_comment?: Maybe<Invitation_Comment>;
  /** An array relationship */
  invitation_comments: Array<Invitation_Comment>;
  /** An aggregate relationship */
  invitation_comments_aggregate: Invitation_Comment_Aggregate;
  invitation_id?: Maybe<Scalars['uuid']['output']>;
  parent_id?: Maybe<Scalars['uuid']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  removed_at?: Maybe<Scalars['timestamptz']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};


/** columns and relationships of "invitation_comment" */
export type Invitation_CommentInvitation_CommentsArgs = {
  distinct_on?: InputMaybe<Array<Invitation_Comment_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Invitation_Comment_Order_By>>;
  where?: InputMaybe<Invitation_Comment_Bool_Exp>;
};


/** columns and relationships of "invitation_comment" */
export type Invitation_CommentInvitation_Comments_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Invitation_Comment_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Invitation_Comment_Order_By>>;
  where?: InputMaybe<Invitation_Comment_Bool_Exp>;
};

/** aggregated selection of "invitation_comment" */
export type Invitation_Comment_Aggregate = {
  __typename?: 'invitation_comment_aggregate';
  aggregate?: Maybe<Invitation_Comment_Aggregate_Fields>;
  nodes: Array<Invitation_Comment>;
};

export type Invitation_Comment_Aggregate_Bool_Exp = {
  count?: InputMaybe<Invitation_Comment_Aggregate_Bool_Exp_Count>;
};

export type Invitation_Comment_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Invitation_Comment_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Invitation_Comment_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "invitation_comment" */
export type Invitation_Comment_Aggregate_Fields = {
  __typename?: 'invitation_comment_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Invitation_Comment_Max_Fields>;
  min?: Maybe<Invitation_Comment_Min_Fields>;
};


/** aggregate fields of "invitation_comment" */
export type Invitation_Comment_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Invitation_Comment_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "invitation_comment" */
export type Invitation_Comment_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Invitation_Comment_Max_Order_By>;
  min?: InputMaybe<Invitation_Comment_Min_Order_By>;
};

/** input type for inserting array relation for remote table "invitation_comment" */
export type Invitation_Comment_Arr_Rel_Insert_Input = {
  data: Array<Invitation_Comment_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Invitation_Comment_On_Conflict>;
};

/** Boolean expression to filter rows from the table "invitation_comment". All fields are combined with a logical 'AND'. */
export type Invitation_Comment_Bool_Exp = {
  _and?: InputMaybe<Array<Invitation_Comment_Bool_Exp>>;
  _not?: InputMaybe<Invitation_Comment_Bool_Exp>;
  _or?: InputMaybe<Array<Invitation_Comment_Bool_Exp>>;
  author?: InputMaybe<String_Comparison_Exp>;
  author_profile_image?: InputMaybe<String_Comparison_Exp>;
  body?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  invitation?: InputMaybe<Invitation_Bool_Exp>;
  invitation_comment?: InputMaybe<Invitation_Comment_Bool_Exp>;
  invitation_comments?: InputMaybe<Invitation_Comment_Bool_Exp>;
  invitation_comments_aggregate?: InputMaybe<Invitation_Comment_Aggregate_Bool_Exp>;
  invitation_id?: InputMaybe<Uuid_Comparison_Exp>;
  parent_id?: InputMaybe<Uuid_Comparison_Exp>;
  password?: InputMaybe<String_Comparison_Exp>;
  removed_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "invitation_comment" */
export enum Invitation_Comment_Constraint {
  /** unique or primary key constraint on columns "id" */
  InvitationCommentPkey = 'invitation_comment_pkey'
}

/** input type for inserting data into table "invitation_comment" */
export type Invitation_Comment_Insert_Input = {
  author?: InputMaybe<Scalars['String']['input']>;
  author_profile_image?: InputMaybe<Scalars['String']['input']>;
  body?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  invitation?: InputMaybe<Invitation_Obj_Rel_Insert_Input>;
  invitation_comment?: InputMaybe<Invitation_Comment_Obj_Rel_Insert_Input>;
  invitation_comments?: InputMaybe<Invitation_Comment_Arr_Rel_Insert_Input>;
  invitation_id?: InputMaybe<Scalars['uuid']['input']>;
  parent_id?: InputMaybe<Scalars['uuid']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  removed_at?: InputMaybe<Scalars['timestamptz']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Invitation_Comment_Max_Fields = {
  __typename?: 'invitation_comment_max_fields';
  author?: Maybe<Scalars['String']['output']>;
  author_profile_image?: Maybe<Scalars['String']['output']>;
  body?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  invitation_id?: Maybe<Scalars['uuid']['output']>;
  parent_id?: Maybe<Scalars['uuid']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  removed_at?: Maybe<Scalars['timestamptz']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "invitation_comment" */
export type Invitation_Comment_Max_Order_By = {
  author?: InputMaybe<Order_By>;
  author_profile_image?: InputMaybe<Order_By>;
  body?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  invitation_id?: InputMaybe<Order_By>;
  parent_id?: InputMaybe<Order_By>;
  password?: InputMaybe<Order_By>;
  removed_at?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Invitation_Comment_Min_Fields = {
  __typename?: 'invitation_comment_min_fields';
  author?: Maybe<Scalars['String']['output']>;
  author_profile_image?: Maybe<Scalars['String']['output']>;
  body?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  invitation_id?: Maybe<Scalars['uuid']['output']>;
  parent_id?: Maybe<Scalars['uuid']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  removed_at?: Maybe<Scalars['timestamptz']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "invitation_comment" */
export type Invitation_Comment_Min_Order_By = {
  author?: InputMaybe<Order_By>;
  author_profile_image?: InputMaybe<Order_By>;
  body?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  invitation_id?: InputMaybe<Order_By>;
  parent_id?: InputMaybe<Order_By>;
  password?: InputMaybe<Order_By>;
  removed_at?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "invitation_comment" */
export type Invitation_Comment_Mutation_Response = {
  __typename?: 'invitation_comment_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Invitation_Comment>;
};

/** input type for inserting object relation for remote table "invitation_comment" */
export type Invitation_Comment_Obj_Rel_Insert_Input = {
  data: Invitation_Comment_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Invitation_Comment_On_Conflict>;
};

/** on_conflict condition type for table "invitation_comment" */
export type Invitation_Comment_On_Conflict = {
  constraint: Invitation_Comment_Constraint;
  update_columns?: Array<Invitation_Comment_Update_Column>;
  where?: InputMaybe<Invitation_Comment_Bool_Exp>;
};

/** Ordering options when selecting data from "invitation_comment". */
export type Invitation_Comment_Order_By = {
  author?: InputMaybe<Order_By>;
  author_profile_image?: InputMaybe<Order_By>;
  body?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  invitation?: InputMaybe<Invitation_Order_By>;
  invitation_comment?: InputMaybe<Invitation_Comment_Order_By>;
  invitation_comments_aggregate?: InputMaybe<Invitation_Comment_Aggregate_Order_By>;
  invitation_id?: InputMaybe<Order_By>;
  parent_id?: InputMaybe<Order_By>;
  password?: InputMaybe<Order_By>;
  removed_at?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: invitation_comment */
export type Invitation_Comment_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "invitation_comment" */
export enum Invitation_Comment_Select_Column {
  /** column name */
  Author = 'author',
  /** column name */
  AuthorProfileImage = 'author_profile_image',
  /** column name */
  Body = 'body',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  InvitationId = 'invitation_id',
  /** column name */
  ParentId = 'parent_id',
  /** column name */
  Password = 'password',
  /** column name */
  RemovedAt = 'removed_at',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "invitation_comment" */
export type Invitation_Comment_Set_Input = {
  author?: InputMaybe<Scalars['String']['input']>;
  author_profile_image?: InputMaybe<Scalars['String']['input']>;
  body?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  invitation_id?: InputMaybe<Scalars['uuid']['input']>;
  parent_id?: InputMaybe<Scalars['uuid']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  removed_at?: InputMaybe<Scalars['timestamptz']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** Streaming cursor of the table "invitation_comment" */
export type Invitation_Comment_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Invitation_Comment_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Invitation_Comment_Stream_Cursor_Value_Input = {
  author?: InputMaybe<Scalars['String']['input']>;
  author_profile_image?: InputMaybe<Scalars['String']['input']>;
  body?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  invitation_id?: InputMaybe<Scalars['uuid']['input']>;
  parent_id?: InputMaybe<Scalars['uuid']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  removed_at?: InputMaybe<Scalars['timestamptz']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** update columns of table "invitation_comment" */
export enum Invitation_Comment_Update_Column {
  /** column name */
  Author = 'author',
  /** column name */
  AuthorProfileImage = 'author_profile_image',
  /** column name */
  Body = 'body',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  InvitationId = 'invitation_id',
  /** column name */
  ParentId = 'parent_id',
  /** column name */
  Password = 'password',
  /** column name */
  RemovedAt = 'removed_at',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Invitation_Comment_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Invitation_Comment_Set_Input>;
  /** filter the rows which have to be updated */
  where: Invitation_Comment_Bool_Exp;
};

/** unique or primary key constraints on table "invitation" */
export enum Invitation_Constraint {
  /** unique or primary key constraint on columns "id" */
  InvitationPkey = 'invitation_pkey'
}

/** columns and relationships of "invitation_editor" */
export type Invitation_Editor = {
  __typename?: 'invitation_editor';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id: Scalars['uuid']['output'];
  /** An object relationship */
  invitation?: Maybe<Invitation>;
  invitation_id?: Maybe<Scalars['uuid']['output']>;
  is_creator?: Maybe<Scalars['Boolean']['output']>;
  last_edit_at?: Maybe<Scalars['timestamptz']['output']>;
  /** An object relationship */
  user?: Maybe<User>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** aggregated selection of "invitation_editor" */
export type Invitation_Editor_Aggregate = {
  __typename?: 'invitation_editor_aggregate';
  aggregate?: Maybe<Invitation_Editor_Aggregate_Fields>;
  nodes: Array<Invitation_Editor>;
};

export type Invitation_Editor_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Invitation_Editor_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Invitation_Editor_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Invitation_Editor_Aggregate_Bool_Exp_Count>;
};

export type Invitation_Editor_Aggregate_Bool_Exp_Bool_And = {
  arguments: Invitation_Editor_Select_Column_Invitation_Editor_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Invitation_Editor_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Invitation_Editor_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Invitation_Editor_Select_Column_Invitation_Editor_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Invitation_Editor_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Invitation_Editor_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Invitation_Editor_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Invitation_Editor_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "invitation_editor" */
export type Invitation_Editor_Aggregate_Fields = {
  __typename?: 'invitation_editor_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Invitation_Editor_Max_Fields>;
  min?: Maybe<Invitation_Editor_Min_Fields>;
};


/** aggregate fields of "invitation_editor" */
export type Invitation_Editor_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Invitation_Editor_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "invitation_editor" */
export type Invitation_Editor_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Invitation_Editor_Max_Order_By>;
  min?: InputMaybe<Invitation_Editor_Min_Order_By>;
};

/** input type for inserting array relation for remote table "invitation_editor" */
export type Invitation_Editor_Arr_Rel_Insert_Input = {
  data: Array<Invitation_Editor_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Invitation_Editor_On_Conflict>;
};

/** Boolean expression to filter rows from the table "invitation_editor". All fields are combined with a logical 'AND'. */
export type Invitation_Editor_Bool_Exp = {
  _and?: InputMaybe<Array<Invitation_Editor_Bool_Exp>>;
  _not?: InputMaybe<Invitation_Editor_Bool_Exp>;
  _or?: InputMaybe<Array<Invitation_Editor_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  invitation?: InputMaybe<Invitation_Bool_Exp>;
  invitation_id?: InputMaybe<Uuid_Comparison_Exp>;
  is_creator?: InputMaybe<Boolean_Comparison_Exp>;
  last_edit_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<User_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "invitation_editor" */
export enum Invitation_Editor_Constraint {
  /** unique or primary key constraint on columns "id" */
  InvitationEditorPkey = 'invitation_editor_pkey'
}

/** input type for inserting data into table "invitation_editor" */
export type Invitation_Editor_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  invitation?: InputMaybe<Invitation_Obj_Rel_Insert_Input>;
  invitation_id?: InputMaybe<Scalars['uuid']['input']>;
  is_creator?: InputMaybe<Scalars['Boolean']['input']>;
  last_edit_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user?: InputMaybe<User_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Invitation_Editor_Max_Fields = {
  __typename?: 'invitation_editor_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  invitation_id?: Maybe<Scalars['uuid']['output']>;
  last_edit_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "invitation_editor" */
export type Invitation_Editor_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  invitation_id?: InputMaybe<Order_By>;
  last_edit_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Invitation_Editor_Min_Fields = {
  __typename?: 'invitation_editor_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  invitation_id?: Maybe<Scalars['uuid']['output']>;
  last_edit_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "invitation_editor" */
export type Invitation_Editor_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  invitation_id?: InputMaybe<Order_By>;
  last_edit_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "invitation_editor" */
export type Invitation_Editor_Mutation_Response = {
  __typename?: 'invitation_editor_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Invitation_Editor>;
};

/** on_conflict condition type for table "invitation_editor" */
export type Invitation_Editor_On_Conflict = {
  constraint: Invitation_Editor_Constraint;
  update_columns?: Array<Invitation_Editor_Update_Column>;
  where?: InputMaybe<Invitation_Editor_Bool_Exp>;
};

/** Ordering options when selecting data from "invitation_editor". */
export type Invitation_Editor_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  invitation?: InputMaybe<Invitation_Order_By>;
  invitation_id?: InputMaybe<Order_By>;
  is_creator?: InputMaybe<Order_By>;
  last_edit_at?: InputMaybe<Order_By>;
  user?: InputMaybe<User_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: invitation_editor */
export type Invitation_Editor_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "invitation_editor" */
export enum Invitation_Editor_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  InvitationId = 'invitation_id',
  /** column name */
  IsCreator = 'is_creator',
  /** column name */
  LastEditAt = 'last_edit_at',
  /** column name */
  UserId = 'user_id'
}

/** select "invitation_editor_aggregate_bool_exp_bool_and_arguments_columns" columns of table "invitation_editor" */
export enum Invitation_Editor_Select_Column_Invitation_Editor_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  IsCreator = 'is_creator'
}

/** select "invitation_editor_aggregate_bool_exp_bool_or_arguments_columns" columns of table "invitation_editor" */
export enum Invitation_Editor_Select_Column_Invitation_Editor_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  IsCreator = 'is_creator'
}

/** input type for updating data in table "invitation_editor" */
export type Invitation_Editor_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  invitation_id?: InputMaybe<Scalars['uuid']['input']>;
  is_creator?: InputMaybe<Scalars['Boolean']['input']>;
  last_edit_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "invitation_editor" */
export type Invitation_Editor_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Invitation_Editor_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Invitation_Editor_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  invitation_id?: InputMaybe<Scalars['uuid']['input']>;
  is_creator?: InputMaybe<Scalars['Boolean']['input']>;
  last_edit_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "invitation_editor" */
export enum Invitation_Editor_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  InvitationId = 'invitation_id',
  /** column name */
  IsCreator = 'is_creator',
  /** column name */
  LastEditAt = 'last_edit_at',
  /** column name */
  UserId = 'user_id'
}

export type Invitation_Editor_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Invitation_Editor_Set_Input>;
  /** filter the rows which have to be updated */
  where: Invitation_Editor_Bool_Exp;
};

/** input type for inserting data into table "invitation" */
export type Invitation_Insert_Input = {
  address?: InputMaybe<Scalars['String']['input']>;
  brand_color?: InputMaybe<Scalars['String']['input']>;
  coord?: InputMaybe<Scalars['String']['input']>;
  coupon_using_histories?: InputMaybe<Coupon_Using_History_Arr_Rel_Insert_Input>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  event_at?: InputMaybe<Scalars['timestamptz']['input']>;
  font?: InputMaybe<Scalars['String']['input']>;
  full_day_schedule?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  invitation_attachments?: InputMaybe<Invitation_Attachment_Arr_Rel_Insert_Input>;
  invitation_comments?: InputMaybe<Invitation_Comment_Arr_Rel_Insert_Input>;
  invitation_editors?: InputMaybe<Invitation_Editor_Arr_Rel_Insert_Input>;
  invitation_owners?: InputMaybe<Invitation_Owner_Arr_Rel_Insert_Input>;
  invitation_rsvp_answers?: InputMaybe<Invitation_Rsvp_Answer_Arr_Rel_Insert_Input>;
  invitation_shares?: InputMaybe<Invitation_Share_Arr_Rel_Insert_Input>;
  invitation_visit_logs?: InputMaybe<Invitation_Visit_Log_Arr_Rel_Insert_Input>;
  layout_type?: InputMaybe<Scalars['String']['input']>;
  orders?: InputMaybe<Order_Arr_Rel_Insert_Input>;
  place_detail?: InputMaybe<Scalars['String']['input']>;
  place_name?: InputMaybe<Scalars['String']['input']>;
  removed_at?: InputMaybe<Scalars['timestamptz']['input']>;
  road_address?: InputMaybe<Scalars['String']['input']>;
  templates?: InputMaybe<Template_Arr_Rel_Insert_Input>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  widgets?: InputMaybe<Widget_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Invitation_Max_Fields = {
  __typename?: 'invitation_max_fields';
  address?: Maybe<Scalars['String']['output']>;
  brand_color?: Maybe<Scalars['String']['output']>;
  coord?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  event_at?: Maybe<Scalars['timestamptz']['output']>;
  font?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  layout_type?: Maybe<Scalars['String']['output']>;
  place_detail?: Maybe<Scalars['String']['output']>;
  place_name?: Maybe<Scalars['String']['output']>;
  removed_at?: Maybe<Scalars['timestamptz']['output']>;
  road_address?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregate min on columns */
export type Invitation_Min_Fields = {
  __typename?: 'invitation_min_fields';
  address?: Maybe<Scalars['String']['output']>;
  brand_color?: Maybe<Scalars['String']['output']>;
  coord?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  event_at?: Maybe<Scalars['timestamptz']['output']>;
  font?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  layout_type?: Maybe<Scalars['String']['output']>;
  place_detail?: Maybe<Scalars['String']['output']>;
  place_name?: Maybe<Scalars['String']['output']>;
  removed_at?: Maybe<Scalars['timestamptz']['output']>;
  road_address?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** response of any mutation on the table "invitation" */
export type Invitation_Mutation_Response = {
  __typename?: 'invitation_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Invitation>;
};

/** input type for inserting object relation for remote table "invitation" */
export type Invitation_Obj_Rel_Insert_Input = {
  data: Invitation_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Invitation_On_Conflict>;
};

/** on_conflict condition type for table "invitation" */
export type Invitation_On_Conflict = {
  constraint: Invitation_Constraint;
  update_columns?: Array<Invitation_Update_Column>;
  where?: InputMaybe<Invitation_Bool_Exp>;
};

/** Ordering options when selecting data from "invitation". */
export type Invitation_Order_By = {
  address?: InputMaybe<Order_By>;
  brand_color?: InputMaybe<Order_By>;
  coord?: InputMaybe<Order_By>;
  coupon_using_histories_aggregate?: InputMaybe<Coupon_Using_History_Aggregate_Order_By>;
  created_at?: InputMaybe<Order_By>;
  event_at?: InputMaybe<Order_By>;
  font?: InputMaybe<Order_By>;
  full_day_schedule?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  invitation_attachments_aggregate?: InputMaybe<Invitation_Attachment_Aggregate_Order_By>;
  invitation_comments_aggregate?: InputMaybe<Invitation_Comment_Aggregate_Order_By>;
  invitation_editors_aggregate?: InputMaybe<Invitation_Editor_Aggregate_Order_By>;
  invitation_owners_aggregate?: InputMaybe<Invitation_Owner_Aggregate_Order_By>;
  invitation_rsvp_answers_aggregate?: InputMaybe<Invitation_Rsvp_Answer_Aggregate_Order_By>;
  invitation_shares_aggregate?: InputMaybe<Invitation_Share_Aggregate_Order_By>;
  invitation_visit_logs_aggregate?: InputMaybe<Invitation_Visit_Log_Aggregate_Order_By>;
  layout_type?: InputMaybe<Order_By>;
  orders_aggregate?: InputMaybe<Order_Aggregate_Order_By>;
  place_detail?: InputMaybe<Order_By>;
  place_name?: InputMaybe<Order_By>;
  removed_at?: InputMaybe<Order_By>;
  road_address?: InputMaybe<Order_By>;
  templates_aggregate?: InputMaybe<Template_Aggregate_Order_By>;
  updated_at?: InputMaybe<Order_By>;
  widgets_aggregate?: InputMaybe<Widget_Aggregate_Order_By>;
};

/** columns and relationships of "invitation_owner" */
export type Invitation_Owner = {
  __typename?: 'invitation_owner';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  family_name?: Maybe<Scalars['String']['output']>;
  family_name_first?: Maybe<Scalars['Boolean']['output']>;
  father_family_name?: Maybe<Scalars['String']['output']>;
  father_family_name_first?: Maybe<Scalars['Boolean']['output']>;
  father_given_name?: Maybe<Scalars['String']['output']>;
  father_is_deceased?: Maybe<Scalars['Boolean']['output']>;
  father_is_hidden?: Maybe<Scalars['Boolean']['output']>;
  given_name?: Maybe<Scalars['String']['output']>;
  id: Scalars['uuid']['output'];
  index?: Maybe<Scalars['Int']['output']>;
  /** An object relationship */
  invitation?: Maybe<Invitation>;
  invitation_id?: Maybe<Scalars['uuid']['output']>;
  level?: Maybe<Scalars['String']['output']>;
  mother_family_name?: Maybe<Scalars['String']['output']>;
  mother_family_name_first?: Maybe<Scalars['Boolean']['output']>;
  mother_given_name?: Maybe<Scalars['String']['output']>;
  mother_is_deceased?: Maybe<Scalars['Boolean']['output']>;
  mother_is_hidden?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregated selection of "invitation_owner" */
export type Invitation_Owner_Aggregate = {
  __typename?: 'invitation_owner_aggregate';
  aggregate?: Maybe<Invitation_Owner_Aggregate_Fields>;
  nodes: Array<Invitation_Owner>;
};

export type Invitation_Owner_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Invitation_Owner_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Invitation_Owner_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Invitation_Owner_Aggregate_Bool_Exp_Count>;
};

export type Invitation_Owner_Aggregate_Bool_Exp_Bool_And = {
  arguments: Invitation_Owner_Select_Column_Invitation_Owner_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Invitation_Owner_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Invitation_Owner_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Invitation_Owner_Select_Column_Invitation_Owner_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Invitation_Owner_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Invitation_Owner_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Invitation_Owner_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Invitation_Owner_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "invitation_owner" */
export type Invitation_Owner_Aggregate_Fields = {
  __typename?: 'invitation_owner_aggregate_fields';
  avg?: Maybe<Invitation_Owner_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Invitation_Owner_Max_Fields>;
  min?: Maybe<Invitation_Owner_Min_Fields>;
  stddev?: Maybe<Invitation_Owner_Stddev_Fields>;
  stddev_pop?: Maybe<Invitation_Owner_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Invitation_Owner_Stddev_Samp_Fields>;
  sum?: Maybe<Invitation_Owner_Sum_Fields>;
  var_pop?: Maybe<Invitation_Owner_Var_Pop_Fields>;
  var_samp?: Maybe<Invitation_Owner_Var_Samp_Fields>;
  variance?: Maybe<Invitation_Owner_Variance_Fields>;
};


/** aggregate fields of "invitation_owner" */
export type Invitation_Owner_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Invitation_Owner_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "invitation_owner" */
export type Invitation_Owner_Aggregate_Order_By = {
  avg?: InputMaybe<Invitation_Owner_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Invitation_Owner_Max_Order_By>;
  min?: InputMaybe<Invitation_Owner_Min_Order_By>;
  stddev?: InputMaybe<Invitation_Owner_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Invitation_Owner_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Invitation_Owner_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Invitation_Owner_Sum_Order_By>;
  var_pop?: InputMaybe<Invitation_Owner_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Invitation_Owner_Var_Samp_Order_By>;
  variance?: InputMaybe<Invitation_Owner_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "invitation_owner" */
export type Invitation_Owner_Arr_Rel_Insert_Input = {
  data: Array<Invitation_Owner_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Invitation_Owner_On_Conflict>;
};

/** aggregate avg on columns */
export type Invitation_Owner_Avg_Fields = {
  __typename?: 'invitation_owner_avg_fields';
  index?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "invitation_owner" */
export type Invitation_Owner_Avg_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "invitation_owner". All fields are combined with a logical 'AND'. */
export type Invitation_Owner_Bool_Exp = {
  _and?: InputMaybe<Array<Invitation_Owner_Bool_Exp>>;
  _not?: InputMaybe<Invitation_Owner_Bool_Exp>;
  _or?: InputMaybe<Array<Invitation_Owner_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  family_name?: InputMaybe<String_Comparison_Exp>;
  family_name_first?: InputMaybe<Boolean_Comparison_Exp>;
  father_family_name?: InputMaybe<String_Comparison_Exp>;
  father_family_name_first?: InputMaybe<Boolean_Comparison_Exp>;
  father_given_name?: InputMaybe<String_Comparison_Exp>;
  father_is_deceased?: InputMaybe<Boolean_Comparison_Exp>;
  father_is_hidden?: InputMaybe<Boolean_Comparison_Exp>;
  given_name?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  index?: InputMaybe<Int_Comparison_Exp>;
  invitation?: InputMaybe<Invitation_Bool_Exp>;
  invitation_id?: InputMaybe<Uuid_Comparison_Exp>;
  level?: InputMaybe<String_Comparison_Exp>;
  mother_family_name?: InputMaybe<String_Comparison_Exp>;
  mother_family_name_first?: InputMaybe<Boolean_Comparison_Exp>;
  mother_given_name?: InputMaybe<String_Comparison_Exp>;
  mother_is_deceased?: InputMaybe<Boolean_Comparison_Exp>;
  mother_is_hidden?: InputMaybe<Boolean_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  role?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "invitation_owner" */
export enum Invitation_Owner_Constraint {
  /** unique or primary key constraint on columns "id" */
  InvitationOwnerPkey = 'invitation_owner_pkey'
}

/** input type for incrementing numeric columns in table "invitation_owner" */
export type Invitation_Owner_Inc_Input = {
  index?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "invitation_owner" */
export type Invitation_Owner_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  family_name?: InputMaybe<Scalars['String']['input']>;
  family_name_first?: InputMaybe<Scalars['Boolean']['input']>;
  father_family_name?: InputMaybe<Scalars['String']['input']>;
  father_family_name_first?: InputMaybe<Scalars['Boolean']['input']>;
  father_given_name?: InputMaybe<Scalars['String']['input']>;
  father_is_deceased?: InputMaybe<Scalars['Boolean']['input']>;
  father_is_hidden?: InputMaybe<Scalars['Boolean']['input']>;
  given_name?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  index?: InputMaybe<Scalars['Int']['input']>;
  invitation?: InputMaybe<Invitation_Obj_Rel_Insert_Input>;
  invitation_id?: InputMaybe<Scalars['uuid']['input']>;
  level?: InputMaybe<Scalars['String']['input']>;
  mother_family_name?: InputMaybe<Scalars['String']['input']>;
  mother_family_name_first?: InputMaybe<Scalars['Boolean']['input']>;
  mother_given_name?: InputMaybe<Scalars['String']['input']>;
  mother_is_deceased?: InputMaybe<Scalars['Boolean']['input']>;
  mother_is_hidden?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Invitation_Owner_Max_Fields = {
  __typename?: 'invitation_owner_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  family_name?: Maybe<Scalars['String']['output']>;
  father_family_name?: Maybe<Scalars['String']['output']>;
  father_given_name?: Maybe<Scalars['String']['output']>;
  given_name?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  index?: Maybe<Scalars['Int']['output']>;
  invitation_id?: Maybe<Scalars['uuid']['output']>;
  level?: Maybe<Scalars['String']['output']>;
  mother_family_name?: Maybe<Scalars['String']['output']>;
  mother_given_name?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "invitation_owner" */
export type Invitation_Owner_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  family_name?: InputMaybe<Order_By>;
  father_family_name?: InputMaybe<Order_By>;
  father_given_name?: InputMaybe<Order_By>;
  given_name?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  index?: InputMaybe<Order_By>;
  invitation_id?: InputMaybe<Order_By>;
  level?: InputMaybe<Order_By>;
  mother_family_name?: InputMaybe<Order_By>;
  mother_given_name?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Invitation_Owner_Min_Fields = {
  __typename?: 'invitation_owner_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  family_name?: Maybe<Scalars['String']['output']>;
  father_family_name?: Maybe<Scalars['String']['output']>;
  father_given_name?: Maybe<Scalars['String']['output']>;
  given_name?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  index?: Maybe<Scalars['Int']['output']>;
  invitation_id?: Maybe<Scalars['uuid']['output']>;
  level?: Maybe<Scalars['String']['output']>;
  mother_family_name?: Maybe<Scalars['String']['output']>;
  mother_given_name?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "invitation_owner" */
export type Invitation_Owner_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  family_name?: InputMaybe<Order_By>;
  father_family_name?: InputMaybe<Order_By>;
  father_given_name?: InputMaybe<Order_By>;
  given_name?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  index?: InputMaybe<Order_By>;
  invitation_id?: InputMaybe<Order_By>;
  level?: InputMaybe<Order_By>;
  mother_family_name?: InputMaybe<Order_By>;
  mother_given_name?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "invitation_owner" */
export type Invitation_Owner_Mutation_Response = {
  __typename?: 'invitation_owner_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Invitation_Owner>;
};

/** on_conflict condition type for table "invitation_owner" */
export type Invitation_Owner_On_Conflict = {
  constraint: Invitation_Owner_Constraint;
  update_columns?: Array<Invitation_Owner_Update_Column>;
  where?: InputMaybe<Invitation_Owner_Bool_Exp>;
};

/** Ordering options when selecting data from "invitation_owner". */
export type Invitation_Owner_Order_By = {
  created_at?: InputMaybe<Order_By>;
  family_name?: InputMaybe<Order_By>;
  family_name_first?: InputMaybe<Order_By>;
  father_family_name?: InputMaybe<Order_By>;
  father_family_name_first?: InputMaybe<Order_By>;
  father_given_name?: InputMaybe<Order_By>;
  father_is_deceased?: InputMaybe<Order_By>;
  father_is_hidden?: InputMaybe<Order_By>;
  given_name?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  index?: InputMaybe<Order_By>;
  invitation?: InputMaybe<Invitation_Order_By>;
  invitation_id?: InputMaybe<Order_By>;
  level?: InputMaybe<Order_By>;
  mother_family_name?: InputMaybe<Order_By>;
  mother_family_name_first?: InputMaybe<Order_By>;
  mother_given_name?: InputMaybe<Order_By>;
  mother_is_deceased?: InputMaybe<Order_By>;
  mother_is_hidden?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: invitation_owner */
export type Invitation_Owner_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "invitation_owner" */
export enum Invitation_Owner_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FamilyName = 'family_name',
  /** column name */
  FamilyNameFirst = 'family_name_first',
  /** column name */
  FatherFamilyName = 'father_family_name',
  /** column name */
  FatherFamilyNameFirst = 'father_family_name_first',
  /** column name */
  FatherGivenName = 'father_given_name',
  /** column name */
  FatherIsDeceased = 'father_is_deceased',
  /** column name */
  FatherIsHidden = 'father_is_hidden',
  /** column name */
  GivenName = 'given_name',
  /** column name */
  Id = 'id',
  /** column name */
  Index = 'index',
  /** column name */
  InvitationId = 'invitation_id',
  /** column name */
  Level = 'level',
  /** column name */
  MotherFamilyName = 'mother_family_name',
  /** column name */
  MotherFamilyNameFirst = 'mother_family_name_first',
  /** column name */
  MotherGivenName = 'mother_given_name',
  /** column name */
  MotherIsDeceased = 'mother_is_deceased',
  /** column name */
  MotherIsHidden = 'mother_is_hidden',
  /** column name */
  Name = 'name',
  /** column name */
  Role = 'role',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** select "invitation_owner_aggregate_bool_exp_bool_and_arguments_columns" columns of table "invitation_owner" */
export enum Invitation_Owner_Select_Column_Invitation_Owner_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  FamilyNameFirst = 'family_name_first',
  /** column name */
  FatherFamilyNameFirst = 'father_family_name_first',
  /** column name */
  FatherIsDeceased = 'father_is_deceased',
  /** column name */
  FatherIsHidden = 'father_is_hidden',
  /** column name */
  MotherFamilyNameFirst = 'mother_family_name_first',
  /** column name */
  MotherIsDeceased = 'mother_is_deceased',
  /** column name */
  MotherIsHidden = 'mother_is_hidden'
}

/** select "invitation_owner_aggregate_bool_exp_bool_or_arguments_columns" columns of table "invitation_owner" */
export enum Invitation_Owner_Select_Column_Invitation_Owner_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  FamilyNameFirst = 'family_name_first',
  /** column name */
  FatherFamilyNameFirst = 'father_family_name_first',
  /** column name */
  FatherIsDeceased = 'father_is_deceased',
  /** column name */
  FatherIsHidden = 'father_is_hidden',
  /** column name */
  MotherFamilyNameFirst = 'mother_family_name_first',
  /** column name */
  MotherIsDeceased = 'mother_is_deceased',
  /** column name */
  MotherIsHidden = 'mother_is_hidden'
}

/** input type for updating data in table "invitation_owner" */
export type Invitation_Owner_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  family_name?: InputMaybe<Scalars['String']['input']>;
  family_name_first?: InputMaybe<Scalars['Boolean']['input']>;
  father_family_name?: InputMaybe<Scalars['String']['input']>;
  father_family_name_first?: InputMaybe<Scalars['Boolean']['input']>;
  father_given_name?: InputMaybe<Scalars['String']['input']>;
  father_is_deceased?: InputMaybe<Scalars['Boolean']['input']>;
  father_is_hidden?: InputMaybe<Scalars['Boolean']['input']>;
  given_name?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  index?: InputMaybe<Scalars['Int']['input']>;
  invitation_id?: InputMaybe<Scalars['uuid']['input']>;
  level?: InputMaybe<Scalars['String']['input']>;
  mother_family_name?: InputMaybe<Scalars['String']['input']>;
  mother_family_name_first?: InputMaybe<Scalars['Boolean']['input']>;
  mother_given_name?: InputMaybe<Scalars['String']['input']>;
  mother_is_deceased?: InputMaybe<Scalars['Boolean']['input']>;
  mother_is_hidden?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate stddev on columns */
export type Invitation_Owner_Stddev_Fields = {
  __typename?: 'invitation_owner_stddev_fields';
  index?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "invitation_owner" */
export type Invitation_Owner_Stddev_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Invitation_Owner_Stddev_Pop_Fields = {
  __typename?: 'invitation_owner_stddev_pop_fields';
  index?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "invitation_owner" */
export type Invitation_Owner_Stddev_Pop_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Invitation_Owner_Stddev_Samp_Fields = {
  __typename?: 'invitation_owner_stddev_samp_fields';
  index?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "invitation_owner" */
export type Invitation_Owner_Stddev_Samp_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "invitation_owner" */
export type Invitation_Owner_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Invitation_Owner_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Invitation_Owner_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  family_name?: InputMaybe<Scalars['String']['input']>;
  family_name_first?: InputMaybe<Scalars['Boolean']['input']>;
  father_family_name?: InputMaybe<Scalars['String']['input']>;
  father_family_name_first?: InputMaybe<Scalars['Boolean']['input']>;
  father_given_name?: InputMaybe<Scalars['String']['input']>;
  father_is_deceased?: InputMaybe<Scalars['Boolean']['input']>;
  father_is_hidden?: InputMaybe<Scalars['Boolean']['input']>;
  given_name?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  index?: InputMaybe<Scalars['Int']['input']>;
  invitation_id?: InputMaybe<Scalars['uuid']['input']>;
  level?: InputMaybe<Scalars['String']['input']>;
  mother_family_name?: InputMaybe<Scalars['String']['input']>;
  mother_family_name_first?: InputMaybe<Scalars['Boolean']['input']>;
  mother_given_name?: InputMaybe<Scalars['String']['input']>;
  mother_is_deceased?: InputMaybe<Scalars['Boolean']['input']>;
  mother_is_hidden?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate sum on columns */
export type Invitation_Owner_Sum_Fields = {
  __typename?: 'invitation_owner_sum_fields';
  index?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "invitation_owner" */
export type Invitation_Owner_Sum_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** update columns of table "invitation_owner" */
export enum Invitation_Owner_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FamilyName = 'family_name',
  /** column name */
  FamilyNameFirst = 'family_name_first',
  /** column name */
  FatherFamilyName = 'father_family_name',
  /** column name */
  FatherFamilyNameFirst = 'father_family_name_first',
  /** column name */
  FatherGivenName = 'father_given_name',
  /** column name */
  FatherIsDeceased = 'father_is_deceased',
  /** column name */
  FatherIsHidden = 'father_is_hidden',
  /** column name */
  GivenName = 'given_name',
  /** column name */
  Id = 'id',
  /** column name */
  Index = 'index',
  /** column name */
  InvitationId = 'invitation_id',
  /** column name */
  Level = 'level',
  /** column name */
  MotherFamilyName = 'mother_family_name',
  /** column name */
  MotherFamilyNameFirst = 'mother_family_name_first',
  /** column name */
  MotherGivenName = 'mother_given_name',
  /** column name */
  MotherIsDeceased = 'mother_is_deceased',
  /** column name */
  MotherIsHidden = 'mother_is_hidden',
  /** column name */
  Name = 'name',
  /** column name */
  Role = 'role',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Invitation_Owner_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Invitation_Owner_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Invitation_Owner_Set_Input>;
  /** filter the rows which have to be updated */
  where: Invitation_Owner_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Invitation_Owner_Var_Pop_Fields = {
  __typename?: 'invitation_owner_var_pop_fields';
  index?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "invitation_owner" */
export type Invitation_Owner_Var_Pop_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Invitation_Owner_Var_Samp_Fields = {
  __typename?: 'invitation_owner_var_samp_fields';
  index?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "invitation_owner" */
export type Invitation_Owner_Var_Samp_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Invitation_Owner_Variance_Fields = {
  __typename?: 'invitation_owner_variance_fields';
  index?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "invitation_owner" */
export type Invitation_Owner_Variance_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** primary key columns input for table: invitation */
export type Invitation_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** columns and relationships of "invitation_rsvp_answer" */
export type Invitation_Rsvp_Answer = {
  __typename?: 'invitation_rsvp_answer';
  accepted?: Maybe<Scalars['Boolean']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  form_values?: Maybe<Scalars['jsonb']['output']>;
  id: Scalars['uuid']['output'];
  /** An object relationship */
  invitation?: Maybe<Invitation>;
  invitation_id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_tracking_id?: Maybe<Scalars['String']['output']>;
};


/** columns and relationships of "invitation_rsvp_answer" */
export type Invitation_Rsvp_AnswerForm_ValuesArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};

/** aggregated selection of "invitation_rsvp_answer" */
export type Invitation_Rsvp_Answer_Aggregate = {
  __typename?: 'invitation_rsvp_answer_aggregate';
  aggregate?: Maybe<Invitation_Rsvp_Answer_Aggregate_Fields>;
  nodes: Array<Invitation_Rsvp_Answer>;
};

export type Invitation_Rsvp_Answer_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Invitation_Rsvp_Answer_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Invitation_Rsvp_Answer_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Invitation_Rsvp_Answer_Aggregate_Bool_Exp_Count>;
};

export type Invitation_Rsvp_Answer_Aggregate_Bool_Exp_Bool_And = {
  arguments: Invitation_Rsvp_Answer_Select_Column_Invitation_Rsvp_Answer_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Invitation_Rsvp_Answer_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Invitation_Rsvp_Answer_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Invitation_Rsvp_Answer_Select_Column_Invitation_Rsvp_Answer_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Invitation_Rsvp_Answer_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Invitation_Rsvp_Answer_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Invitation_Rsvp_Answer_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Invitation_Rsvp_Answer_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "invitation_rsvp_answer" */
export type Invitation_Rsvp_Answer_Aggregate_Fields = {
  __typename?: 'invitation_rsvp_answer_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Invitation_Rsvp_Answer_Max_Fields>;
  min?: Maybe<Invitation_Rsvp_Answer_Min_Fields>;
};


/** aggregate fields of "invitation_rsvp_answer" */
export type Invitation_Rsvp_Answer_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Invitation_Rsvp_Answer_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "invitation_rsvp_answer" */
export type Invitation_Rsvp_Answer_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Invitation_Rsvp_Answer_Max_Order_By>;
  min?: InputMaybe<Invitation_Rsvp_Answer_Min_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Invitation_Rsvp_Answer_Append_Input = {
  form_values?: InputMaybe<Scalars['jsonb']['input']>;
};

/** input type for inserting array relation for remote table "invitation_rsvp_answer" */
export type Invitation_Rsvp_Answer_Arr_Rel_Insert_Input = {
  data: Array<Invitation_Rsvp_Answer_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Invitation_Rsvp_Answer_On_Conflict>;
};

/** Boolean expression to filter rows from the table "invitation_rsvp_answer". All fields are combined with a logical 'AND'. */
export type Invitation_Rsvp_Answer_Bool_Exp = {
  _and?: InputMaybe<Array<Invitation_Rsvp_Answer_Bool_Exp>>;
  _not?: InputMaybe<Invitation_Rsvp_Answer_Bool_Exp>;
  _or?: InputMaybe<Array<Invitation_Rsvp_Answer_Bool_Exp>>;
  accepted?: InputMaybe<Boolean_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  form_values?: InputMaybe<Jsonb_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  invitation?: InputMaybe<Invitation_Bool_Exp>;
  invitation_id?: InputMaybe<Uuid_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user_tracking_id?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "invitation_rsvp_answer" */
export enum Invitation_Rsvp_Answer_Constraint {
  /** unique or primary key constraint on columns "invitation_id", "user_tracking_id" */
  InvitationRsvpAnswerInvitationUserIdx = 'invitation_rsvp_answer_invitation_user_idx',
  /** unique or primary key constraint on columns "id" */
  InvitationRsvpAnswerPkey = 'invitation_rsvp_answer_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Invitation_Rsvp_Answer_Delete_At_Path_Input = {
  form_values?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Invitation_Rsvp_Answer_Delete_Elem_Input = {
  form_values?: InputMaybe<Scalars['Int']['input']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Invitation_Rsvp_Answer_Delete_Key_Input = {
  form_values?: InputMaybe<Scalars['String']['input']>;
};

/** input type for inserting data into table "invitation_rsvp_answer" */
export type Invitation_Rsvp_Answer_Insert_Input = {
  accepted?: InputMaybe<Scalars['Boolean']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  form_values?: InputMaybe<Scalars['jsonb']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  invitation?: InputMaybe<Invitation_Obj_Rel_Insert_Input>;
  invitation_id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_tracking_id?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Invitation_Rsvp_Answer_Max_Fields = {
  __typename?: 'invitation_rsvp_answer_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  invitation_id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_tracking_id?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "invitation_rsvp_answer" */
export type Invitation_Rsvp_Answer_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  invitation_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_tracking_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Invitation_Rsvp_Answer_Min_Fields = {
  __typename?: 'invitation_rsvp_answer_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  invitation_id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_tracking_id?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "invitation_rsvp_answer" */
export type Invitation_Rsvp_Answer_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  invitation_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_tracking_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "invitation_rsvp_answer" */
export type Invitation_Rsvp_Answer_Mutation_Response = {
  __typename?: 'invitation_rsvp_answer_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Invitation_Rsvp_Answer>;
};

/** on_conflict condition type for table "invitation_rsvp_answer" */
export type Invitation_Rsvp_Answer_On_Conflict = {
  constraint: Invitation_Rsvp_Answer_Constraint;
  update_columns?: Array<Invitation_Rsvp_Answer_Update_Column>;
  where?: InputMaybe<Invitation_Rsvp_Answer_Bool_Exp>;
};

/** Ordering options when selecting data from "invitation_rsvp_answer". */
export type Invitation_Rsvp_Answer_Order_By = {
  accepted?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  form_values?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  invitation?: InputMaybe<Invitation_Order_By>;
  invitation_id?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_tracking_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: invitation_rsvp_answer */
export type Invitation_Rsvp_Answer_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Invitation_Rsvp_Answer_Prepend_Input = {
  form_values?: InputMaybe<Scalars['jsonb']['input']>;
};

/** select columns of table "invitation_rsvp_answer" */
export enum Invitation_Rsvp_Answer_Select_Column {
  /** column name */
  Accepted = 'accepted',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FormValues = 'form_values',
  /** column name */
  Id = 'id',
  /** column name */
  InvitationId = 'invitation_id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserTrackingId = 'user_tracking_id'
}

/** select "invitation_rsvp_answer_aggregate_bool_exp_bool_and_arguments_columns" columns of table "invitation_rsvp_answer" */
export enum Invitation_Rsvp_Answer_Select_Column_Invitation_Rsvp_Answer_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  Accepted = 'accepted'
}

/** select "invitation_rsvp_answer_aggregate_bool_exp_bool_or_arguments_columns" columns of table "invitation_rsvp_answer" */
export enum Invitation_Rsvp_Answer_Select_Column_Invitation_Rsvp_Answer_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  Accepted = 'accepted'
}

/** input type for updating data in table "invitation_rsvp_answer" */
export type Invitation_Rsvp_Answer_Set_Input = {
  accepted?: InputMaybe<Scalars['Boolean']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  form_values?: InputMaybe<Scalars['jsonb']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  invitation_id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_tracking_id?: InputMaybe<Scalars['String']['input']>;
};

/** Streaming cursor of the table "invitation_rsvp_answer" */
export type Invitation_Rsvp_Answer_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Invitation_Rsvp_Answer_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Invitation_Rsvp_Answer_Stream_Cursor_Value_Input = {
  accepted?: InputMaybe<Scalars['Boolean']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  form_values?: InputMaybe<Scalars['jsonb']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  invitation_id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_tracking_id?: InputMaybe<Scalars['String']['input']>;
};

/** update columns of table "invitation_rsvp_answer" */
export enum Invitation_Rsvp_Answer_Update_Column {
  /** column name */
  Accepted = 'accepted',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FormValues = 'form_values',
  /** column name */
  Id = 'id',
  /** column name */
  InvitationId = 'invitation_id',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserTrackingId = 'user_tracking_id'
}

export type Invitation_Rsvp_Answer_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Invitation_Rsvp_Answer_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Invitation_Rsvp_Answer_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Invitation_Rsvp_Answer_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Invitation_Rsvp_Answer_Delete_Key_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Invitation_Rsvp_Answer_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Invitation_Rsvp_Answer_Set_Input>;
  /** filter the rows which have to be updated */
  where: Invitation_Rsvp_Answer_Bool_Exp;
};

/** select columns of table "invitation" */
export enum Invitation_Select_Column {
  /** column name */
  Address = 'address',
  /** column name */
  BrandColor = 'brand_color',
  /** column name */
  Coord = 'coord',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  EventAt = 'event_at',
  /** column name */
  Font = 'font',
  /** column name */
  FullDaySchedule = 'full_day_schedule',
  /** column name */
  Id = 'id',
  /** column name */
  LayoutType = 'layout_type',
  /** column name */
  PlaceDetail = 'place_detail',
  /** column name */
  PlaceName = 'place_name',
  /** column name */
  RemovedAt = 'removed_at',
  /** column name */
  RoadAddress = 'road_address',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "invitation" */
export type Invitation_Set_Input = {
  address?: InputMaybe<Scalars['String']['input']>;
  brand_color?: InputMaybe<Scalars['String']['input']>;
  coord?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  event_at?: InputMaybe<Scalars['timestamptz']['input']>;
  font?: InputMaybe<Scalars['String']['input']>;
  full_day_schedule?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  layout_type?: InputMaybe<Scalars['String']['input']>;
  place_detail?: InputMaybe<Scalars['String']['input']>;
  place_name?: InputMaybe<Scalars['String']['input']>;
  removed_at?: InputMaybe<Scalars['timestamptz']['input']>;
  road_address?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** columns and relationships of "invitation_share" */
export type Invitation_Share = {
  __typename?: 'invitation_share';
  activation_method?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  expired_at?: Maybe<Scalars['timestamptz']['output']>;
  id: Scalars['uuid']['output'];
  /** An object relationship */
  invitation?: Maybe<Invitation>;
  invitation_id?: Maybe<Scalars['uuid']['output']>;
  share_key: Scalars['String']['output'];
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  visible?: Maybe<Scalars['Boolean']['output']>;
};

/** aggregated selection of "invitation_share" */
export type Invitation_Share_Aggregate = {
  __typename?: 'invitation_share_aggregate';
  aggregate?: Maybe<Invitation_Share_Aggregate_Fields>;
  nodes: Array<Invitation_Share>;
};

export type Invitation_Share_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Invitation_Share_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Invitation_Share_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Invitation_Share_Aggregate_Bool_Exp_Count>;
};

export type Invitation_Share_Aggregate_Bool_Exp_Bool_And = {
  arguments: Invitation_Share_Select_Column_Invitation_Share_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Invitation_Share_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Invitation_Share_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Invitation_Share_Select_Column_Invitation_Share_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Invitation_Share_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Invitation_Share_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Invitation_Share_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Invitation_Share_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "invitation_share" */
export type Invitation_Share_Aggregate_Fields = {
  __typename?: 'invitation_share_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Invitation_Share_Max_Fields>;
  min?: Maybe<Invitation_Share_Min_Fields>;
};


/** aggregate fields of "invitation_share" */
export type Invitation_Share_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Invitation_Share_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "invitation_share" */
export type Invitation_Share_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Invitation_Share_Max_Order_By>;
  min?: InputMaybe<Invitation_Share_Min_Order_By>;
};

/** input type for inserting array relation for remote table "invitation_share" */
export type Invitation_Share_Arr_Rel_Insert_Input = {
  data: Array<Invitation_Share_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Invitation_Share_On_Conflict>;
};

/** Boolean expression to filter rows from the table "invitation_share". All fields are combined with a logical 'AND'. */
export type Invitation_Share_Bool_Exp = {
  _and?: InputMaybe<Array<Invitation_Share_Bool_Exp>>;
  _not?: InputMaybe<Invitation_Share_Bool_Exp>;
  _or?: InputMaybe<Array<Invitation_Share_Bool_Exp>>;
  activation_method?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  expired_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  invitation?: InputMaybe<Invitation_Bool_Exp>;
  invitation_id?: InputMaybe<Uuid_Comparison_Exp>;
  share_key?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  visible?: InputMaybe<Boolean_Comparison_Exp>;
};

/** unique or primary key constraints on table "invitation_share" */
export enum Invitation_Share_Constraint {
  /** unique or primary key constraint on columns "share_key" */
  InvitationShareKeyIdx = 'invitation_share_key_idx',
  /** unique or primary key constraint on columns "id" */
  InvitationSharePkey = 'invitation_share_pkey'
}

/** input type for inserting data into table "invitation_share" */
export type Invitation_Share_Insert_Input = {
  activation_method?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  expired_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  invitation?: InputMaybe<Invitation_Obj_Rel_Insert_Input>;
  invitation_id?: InputMaybe<Scalars['uuid']['input']>;
  share_key?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  visible?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate max on columns */
export type Invitation_Share_Max_Fields = {
  __typename?: 'invitation_share_max_fields';
  activation_method?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  expired_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  invitation_id?: Maybe<Scalars['uuid']['output']>;
  share_key?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "invitation_share" */
export type Invitation_Share_Max_Order_By = {
  activation_method?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  expired_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  invitation_id?: InputMaybe<Order_By>;
  share_key?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Invitation_Share_Min_Fields = {
  __typename?: 'invitation_share_min_fields';
  activation_method?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  expired_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  invitation_id?: Maybe<Scalars['uuid']['output']>;
  share_key?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "invitation_share" */
export type Invitation_Share_Min_Order_By = {
  activation_method?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  expired_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  invitation_id?: InputMaybe<Order_By>;
  share_key?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "invitation_share" */
export type Invitation_Share_Mutation_Response = {
  __typename?: 'invitation_share_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Invitation_Share>;
};

/** on_conflict condition type for table "invitation_share" */
export type Invitation_Share_On_Conflict = {
  constraint: Invitation_Share_Constraint;
  update_columns?: Array<Invitation_Share_Update_Column>;
  where?: InputMaybe<Invitation_Share_Bool_Exp>;
};

/** Ordering options when selecting data from "invitation_share". */
export type Invitation_Share_Order_By = {
  activation_method?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  expired_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  invitation?: InputMaybe<Invitation_Order_By>;
  invitation_id?: InputMaybe<Order_By>;
  share_key?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  visible?: InputMaybe<Order_By>;
};

/** primary key columns input for table: invitation_share */
export type Invitation_Share_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "invitation_share" */
export enum Invitation_Share_Select_Column {
  /** column name */
  ActivationMethod = 'activation_method',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  ExpiredAt = 'expired_at',
  /** column name */
  Id = 'id',
  /** column name */
  InvitationId = 'invitation_id',
  /** column name */
  ShareKey = 'share_key',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Visible = 'visible'
}

/** select "invitation_share_aggregate_bool_exp_bool_and_arguments_columns" columns of table "invitation_share" */
export enum Invitation_Share_Select_Column_Invitation_Share_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  Visible = 'visible'
}

/** select "invitation_share_aggregate_bool_exp_bool_or_arguments_columns" columns of table "invitation_share" */
export enum Invitation_Share_Select_Column_Invitation_Share_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  Visible = 'visible'
}

/** input type for updating data in table "invitation_share" */
export type Invitation_Share_Set_Input = {
  activation_method?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  expired_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  invitation_id?: InputMaybe<Scalars['uuid']['input']>;
  share_key?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  visible?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Streaming cursor of the table "invitation_share" */
export type Invitation_Share_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Invitation_Share_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Invitation_Share_Stream_Cursor_Value_Input = {
  activation_method?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  expired_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  invitation_id?: InputMaybe<Scalars['uuid']['input']>;
  share_key?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  visible?: InputMaybe<Scalars['Boolean']['input']>;
};

/** update columns of table "invitation_share" */
export enum Invitation_Share_Update_Column {
  /** column name */
  ActivationMethod = 'activation_method',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  ExpiredAt = 'expired_at',
  /** column name */
  Id = 'id',
  /** column name */
  InvitationId = 'invitation_id',
  /** column name */
  ShareKey = 'share_key',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  Visible = 'visible'
}

export type Invitation_Share_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Invitation_Share_Set_Input>;
  /** filter the rows which have to be updated */
  where: Invitation_Share_Bool_Exp;
};

/** Streaming cursor of the table "invitation" */
export type Invitation_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Invitation_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Invitation_Stream_Cursor_Value_Input = {
  address?: InputMaybe<Scalars['String']['input']>;
  brand_color?: InputMaybe<Scalars['String']['input']>;
  coord?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  event_at?: InputMaybe<Scalars['timestamptz']['input']>;
  font?: InputMaybe<Scalars['String']['input']>;
  full_day_schedule?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  layout_type?: InputMaybe<Scalars['String']['input']>;
  place_detail?: InputMaybe<Scalars['String']['input']>;
  place_name?: InputMaybe<Scalars['String']['input']>;
  removed_at?: InputMaybe<Scalars['timestamptz']['input']>;
  road_address?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** update columns of table "invitation" */
export enum Invitation_Update_Column {
  /** column name */
  Address = 'address',
  /** column name */
  BrandColor = 'brand_color',
  /** column name */
  Coord = 'coord',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  EventAt = 'event_at',
  /** column name */
  Font = 'font',
  /** column name */
  FullDaySchedule = 'full_day_schedule',
  /** column name */
  Id = 'id',
  /** column name */
  LayoutType = 'layout_type',
  /** column name */
  PlaceDetail = 'place_detail',
  /** column name */
  PlaceName = 'place_name',
  /** column name */
  RemovedAt = 'removed_at',
  /** column name */
  RoadAddress = 'road_address',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Invitation_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Invitation_Set_Input>;
  /** filter the rows which have to be updated */
  where: Invitation_Bool_Exp;
};

/** columns and relationships of "invitation_visit_log" */
export type Invitation_Visit_Log = {
  __typename?: 'invitation_visit_log';
  id: Scalars['bigint']['output'];
  /** An object relationship */
  invitation?: Maybe<Invitation>;
  invitation_id?: Maybe<Scalars['uuid']['output']>;
  user_tracking_id?: Maybe<Scalars['String']['output']>;
  visit_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregated selection of "invitation_visit_log" */
export type Invitation_Visit_Log_Aggregate = {
  __typename?: 'invitation_visit_log_aggregate';
  aggregate?: Maybe<Invitation_Visit_Log_Aggregate_Fields>;
  nodes: Array<Invitation_Visit_Log>;
};

export type Invitation_Visit_Log_Aggregate_Bool_Exp = {
  count?: InputMaybe<Invitation_Visit_Log_Aggregate_Bool_Exp_Count>;
};

export type Invitation_Visit_Log_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Invitation_Visit_Log_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Invitation_Visit_Log_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "invitation_visit_log" */
export type Invitation_Visit_Log_Aggregate_Fields = {
  __typename?: 'invitation_visit_log_aggregate_fields';
  avg?: Maybe<Invitation_Visit_Log_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Invitation_Visit_Log_Max_Fields>;
  min?: Maybe<Invitation_Visit_Log_Min_Fields>;
  stddev?: Maybe<Invitation_Visit_Log_Stddev_Fields>;
  stddev_pop?: Maybe<Invitation_Visit_Log_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Invitation_Visit_Log_Stddev_Samp_Fields>;
  sum?: Maybe<Invitation_Visit_Log_Sum_Fields>;
  var_pop?: Maybe<Invitation_Visit_Log_Var_Pop_Fields>;
  var_samp?: Maybe<Invitation_Visit_Log_Var_Samp_Fields>;
  variance?: Maybe<Invitation_Visit_Log_Variance_Fields>;
};


/** aggregate fields of "invitation_visit_log" */
export type Invitation_Visit_Log_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Invitation_Visit_Log_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "invitation_visit_log" */
export type Invitation_Visit_Log_Aggregate_Order_By = {
  avg?: InputMaybe<Invitation_Visit_Log_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Invitation_Visit_Log_Max_Order_By>;
  min?: InputMaybe<Invitation_Visit_Log_Min_Order_By>;
  stddev?: InputMaybe<Invitation_Visit_Log_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Invitation_Visit_Log_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Invitation_Visit_Log_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Invitation_Visit_Log_Sum_Order_By>;
  var_pop?: InputMaybe<Invitation_Visit_Log_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Invitation_Visit_Log_Var_Samp_Order_By>;
  variance?: InputMaybe<Invitation_Visit_Log_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "invitation_visit_log" */
export type Invitation_Visit_Log_Arr_Rel_Insert_Input = {
  data: Array<Invitation_Visit_Log_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Invitation_Visit_Log_On_Conflict>;
};

/** aggregate avg on columns */
export type Invitation_Visit_Log_Avg_Fields = {
  __typename?: 'invitation_visit_log_avg_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "invitation_visit_log" */
export type Invitation_Visit_Log_Avg_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "invitation_visit_log". All fields are combined with a logical 'AND'. */
export type Invitation_Visit_Log_Bool_Exp = {
  _and?: InputMaybe<Array<Invitation_Visit_Log_Bool_Exp>>;
  _not?: InputMaybe<Invitation_Visit_Log_Bool_Exp>;
  _or?: InputMaybe<Array<Invitation_Visit_Log_Bool_Exp>>;
  id?: InputMaybe<Bigint_Comparison_Exp>;
  invitation?: InputMaybe<Invitation_Bool_Exp>;
  invitation_id?: InputMaybe<Uuid_Comparison_Exp>;
  user_tracking_id?: InputMaybe<String_Comparison_Exp>;
  visit_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "invitation_visit_log" */
export enum Invitation_Visit_Log_Constraint {
  /** unique or primary key constraint on columns "id" */
  InvitationVisitLogPkey = 'invitation_visit_log_pkey'
}

/** input type for incrementing numeric columns in table "invitation_visit_log" */
export type Invitation_Visit_Log_Inc_Input = {
  id?: InputMaybe<Scalars['bigint']['input']>;
};

/** input type for inserting data into table "invitation_visit_log" */
export type Invitation_Visit_Log_Insert_Input = {
  id?: InputMaybe<Scalars['bigint']['input']>;
  invitation?: InputMaybe<Invitation_Obj_Rel_Insert_Input>;
  invitation_id?: InputMaybe<Scalars['uuid']['input']>;
  user_tracking_id?: InputMaybe<Scalars['String']['input']>;
  visit_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Invitation_Visit_Log_Max_Fields = {
  __typename?: 'invitation_visit_log_max_fields';
  id?: Maybe<Scalars['bigint']['output']>;
  invitation_id?: Maybe<Scalars['uuid']['output']>;
  user_tracking_id?: Maybe<Scalars['String']['output']>;
  visit_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "invitation_visit_log" */
export type Invitation_Visit_Log_Max_Order_By = {
  id?: InputMaybe<Order_By>;
  invitation_id?: InputMaybe<Order_By>;
  user_tracking_id?: InputMaybe<Order_By>;
  visit_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Invitation_Visit_Log_Min_Fields = {
  __typename?: 'invitation_visit_log_min_fields';
  id?: Maybe<Scalars['bigint']['output']>;
  invitation_id?: Maybe<Scalars['uuid']['output']>;
  user_tracking_id?: Maybe<Scalars['String']['output']>;
  visit_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "invitation_visit_log" */
export type Invitation_Visit_Log_Min_Order_By = {
  id?: InputMaybe<Order_By>;
  invitation_id?: InputMaybe<Order_By>;
  user_tracking_id?: InputMaybe<Order_By>;
  visit_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "invitation_visit_log" */
export type Invitation_Visit_Log_Mutation_Response = {
  __typename?: 'invitation_visit_log_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Invitation_Visit_Log>;
};

/** on_conflict condition type for table "invitation_visit_log" */
export type Invitation_Visit_Log_On_Conflict = {
  constraint: Invitation_Visit_Log_Constraint;
  update_columns?: Array<Invitation_Visit_Log_Update_Column>;
  where?: InputMaybe<Invitation_Visit_Log_Bool_Exp>;
};

/** Ordering options when selecting data from "invitation_visit_log". */
export type Invitation_Visit_Log_Order_By = {
  id?: InputMaybe<Order_By>;
  invitation?: InputMaybe<Invitation_Order_By>;
  invitation_id?: InputMaybe<Order_By>;
  user_tracking_id?: InputMaybe<Order_By>;
  visit_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: invitation_visit_log */
export type Invitation_Visit_Log_Pk_Columns_Input = {
  id: Scalars['bigint']['input'];
};

/** select columns of table "invitation_visit_log" */
export enum Invitation_Visit_Log_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  InvitationId = 'invitation_id',
  /** column name */
  UserTrackingId = 'user_tracking_id',
  /** column name */
  VisitAt = 'visit_at'
}

/** input type for updating data in table "invitation_visit_log" */
export type Invitation_Visit_Log_Set_Input = {
  id?: InputMaybe<Scalars['bigint']['input']>;
  invitation_id?: InputMaybe<Scalars['uuid']['input']>;
  user_tracking_id?: InputMaybe<Scalars['String']['input']>;
  visit_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate stddev on columns */
export type Invitation_Visit_Log_Stddev_Fields = {
  __typename?: 'invitation_visit_log_stddev_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "invitation_visit_log" */
export type Invitation_Visit_Log_Stddev_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Invitation_Visit_Log_Stddev_Pop_Fields = {
  __typename?: 'invitation_visit_log_stddev_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "invitation_visit_log" */
export type Invitation_Visit_Log_Stddev_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Invitation_Visit_Log_Stddev_Samp_Fields = {
  __typename?: 'invitation_visit_log_stddev_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "invitation_visit_log" */
export type Invitation_Visit_Log_Stddev_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "invitation_visit_log" */
export type Invitation_Visit_Log_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Invitation_Visit_Log_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Invitation_Visit_Log_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars['bigint']['input']>;
  invitation_id?: InputMaybe<Scalars['uuid']['input']>;
  user_tracking_id?: InputMaybe<Scalars['String']['input']>;
  visit_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate sum on columns */
export type Invitation_Visit_Log_Sum_Fields = {
  __typename?: 'invitation_visit_log_sum_fields';
  id?: Maybe<Scalars['bigint']['output']>;
};

/** order by sum() on columns of table "invitation_visit_log" */
export type Invitation_Visit_Log_Sum_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** update columns of table "invitation_visit_log" */
export enum Invitation_Visit_Log_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  InvitationId = 'invitation_id',
  /** column name */
  UserTrackingId = 'user_tracking_id',
  /** column name */
  VisitAt = 'visit_at'
}

export type Invitation_Visit_Log_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Invitation_Visit_Log_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Invitation_Visit_Log_Set_Input>;
  /** filter the rows which have to be updated */
  where: Invitation_Visit_Log_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Invitation_Visit_Log_Var_Pop_Fields = {
  __typename?: 'invitation_visit_log_var_pop_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "invitation_visit_log" */
export type Invitation_Visit_Log_Var_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Invitation_Visit_Log_Var_Samp_Fields = {
  __typename?: 'invitation_visit_log_var_samp_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "invitation_visit_log" */
export type Invitation_Visit_Log_Var_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Invitation_Visit_Log_Variance_Fields = {
  __typename?: 'invitation_visit_log_variance_fields';
  id?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "invitation_visit_log" */
export type Invitation_Visit_Log_Variance_Order_By = {
  id?: InputMaybe<Order_By>;
};

export type Jsonb_Cast_Exp = {
  String?: InputMaybe<String_Comparison_Exp>;
};

/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  _cast?: InputMaybe<Jsonb_Cast_Exp>;
  /** is the column contained in the given json value */
  _contained_in?: InputMaybe<Scalars['jsonb']['input']>;
  /** does the column contain the given json value at the top level */
  _contains?: InputMaybe<Scalars['jsonb']['input']>;
  _eq?: InputMaybe<Scalars['jsonb']['input']>;
  _gt?: InputMaybe<Scalars['jsonb']['input']>;
  _gte?: InputMaybe<Scalars['jsonb']['input']>;
  /** does the string exist as a top-level key in the column */
  _has_key?: InputMaybe<Scalars['String']['input']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: InputMaybe<Array<Scalars['String']['input']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: InputMaybe<Array<Scalars['String']['input']>>;
  _in?: InputMaybe<Array<Scalars['jsonb']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['jsonb']['input']>;
  _lte?: InputMaybe<Scalars['jsonb']['input']>;
  _neq?: InputMaybe<Scalars['jsonb']['input']>;
  _nin?: InputMaybe<Array<Scalars['jsonb']['input']>>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "coupon" */
  delete_coupon?: Maybe<Coupon_Mutation_Response>;
  /** delete single row from the table: "coupon" */
  delete_coupon_by_pk?: Maybe<Coupon>;
  /** delete data from the table: "coupon_using_history" */
  delete_coupon_using_history?: Maybe<Coupon_Using_History_Mutation_Response>;
  /** delete single row from the table: "coupon_using_history" */
  delete_coupon_using_history_by_pk?: Maybe<Coupon_Using_History>;
  /** delete data from the table: "invitation" */
  delete_invitation?: Maybe<Invitation_Mutation_Response>;
  /** delete data from the table: "invitation_attachment" */
  delete_invitation_attachment?: Maybe<Invitation_Attachment_Mutation_Response>;
  /** delete single row from the table: "invitation_attachment" */
  delete_invitation_attachment_by_pk?: Maybe<Invitation_Attachment>;
  /** delete single row from the table: "invitation" */
  delete_invitation_by_pk?: Maybe<Invitation>;
  /** delete data from the table: "invitation_comment" */
  delete_invitation_comment?: Maybe<Invitation_Comment_Mutation_Response>;
  /** delete single row from the table: "invitation_comment" */
  delete_invitation_comment_by_pk?: Maybe<Invitation_Comment>;
  /** delete data from the table: "invitation_editor" */
  delete_invitation_editor?: Maybe<Invitation_Editor_Mutation_Response>;
  /** delete single row from the table: "invitation_editor" */
  delete_invitation_editor_by_pk?: Maybe<Invitation_Editor>;
  /** delete data from the table: "invitation_owner" */
  delete_invitation_owner?: Maybe<Invitation_Owner_Mutation_Response>;
  /** delete single row from the table: "invitation_owner" */
  delete_invitation_owner_by_pk?: Maybe<Invitation_Owner>;
  /** delete data from the table: "invitation_rsvp_answer" */
  delete_invitation_rsvp_answer?: Maybe<Invitation_Rsvp_Answer_Mutation_Response>;
  /** delete single row from the table: "invitation_rsvp_answer" */
  delete_invitation_rsvp_answer_by_pk?: Maybe<Invitation_Rsvp_Answer>;
  /** delete data from the table: "invitation_share" */
  delete_invitation_share?: Maybe<Invitation_Share_Mutation_Response>;
  /** delete single row from the table: "invitation_share" */
  delete_invitation_share_by_pk?: Maybe<Invitation_Share>;
  /** delete data from the table: "invitation_visit_log" */
  delete_invitation_visit_log?: Maybe<Invitation_Visit_Log_Mutation_Response>;
  /** delete single row from the table: "invitation_visit_log" */
  delete_invitation_visit_log_by_pk?: Maybe<Invitation_Visit_Log>;
  /** delete data from the table: "order" */
  delete_order?: Maybe<Order_Mutation_Response>;
  /** delete single row from the table: "order" */
  delete_order_by_pk?: Maybe<Order>;
  /** delete data from the table: "sms_verifications" */
  delete_sms_verifications?: Maybe<Sms_Verifications_Mutation_Response>;
  /** delete single row from the table: "sms_verifications" */
  delete_sms_verifications_by_pk?: Maybe<Sms_Verifications>;
  /** delete data from the table: "template" */
  delete_template?: Maybe<Template_Mutation_Response>;
  /** delete single row from the table: "template" */
  delete_template_by_pk?: Maybe<Template>;
  /** delete data from the table: "user" */
  delete_user?: Maybe<User_Mutation_Response>;
  /** delete single row from the table: "user" */
  delete_user_by_pk?: Maybe<User>;
  /** delete data from the table: "user_tokens" */
  delete_user_tokens?: Maybe<User_Tokens_Mutation_Response>;
  /** delete single row from the table: "user_tokens" */
  delete_user_tokens_by_pk?: Maybe<User_Tokens>;
  /** delete data from the table: "widget" */
  delete_widget?: Maybe<Widget_Mutation_Response>;
  /** delete single row from the table: "widget" */
  delete_widget_by_pk?: Maybe<Widget>;
  /** delete data from the table: "widget_sticker" */
  delete_widget_sticker?: Maybe<Widget_Sticker_Mutation_Response>;
  /** delete single row from the table: "widget_sticker" */
  delete_widget_sticker_by_pk?: Maybe<Widget_Sticker>;
  /** insert data into the table: "coupon" */
  insert_coupon?: Maybe<Coupon_Mutation_Response>;
  /** insert a single row into the table: "coupon" */
  insert_coupon_one?: Maybe<Coupon>;
  /** insert data into the table: "coupon_using_history" */
  insert_coupon_using_history?: Maybe<Coupon_Using_History_Mutation_Response>;
  /** insert a single row into the table: "coupon_using_history" */
  insert_coupon_using_history_one?: Maybe<Coupon_Using_History>;
  /** insert data into the table: "invitation" */
  insert_invitation?: Maybe<Invitation_Mutation_Response>;
  /** insert data into the table: "invitation_attachment" */
  insert_invitation_attachment?: Maybe<Invitation_Attachment_Mutation_Response>;
  /** insert a single row into the table: "invitation_attachment" */
  insert_invitation_attachment_one?: Maybe<Invitation_Attachment>;
  /** insert data into the table: "invitation_comment" */
  insert_invitation_comment?: Maybe<Invitation_Comment_Mutation_Response>;
  /** insert a single row into the table: "invitation_comment" */
  insert_invitation_comment_one?: Maybe<Invitation_Comment>;
  /** insert data into the table: "invitation_editor" */
  insert_invitation_editor?: Maybe<Invitation_Editor_Mutation_Response>;
  /** insert a single row into the table: "invitation_editor" */
  insert_invitation_editor_one?: Maybe<Invitation_Editor>;
  /** insert a single row into the table: "invitation" */
  insert_invitation_one?: Maybe<Invitation>;
  /** insert data into the table: "invitation_owner" */
  insert_invitation_owner?: Maybe<Invitation_Owner_Mutation_Response>;
  /** insert a single row into the table: "invitation_owner" */
  insert_invitation_owner_one?: Maybe<Invitation_Owner>;
  /** insert data into the table: "invitation_rsvp_answer" */
  insert_invitation_rsvp_answer?: Maybe<Invitation_Rsvp_Answer_Mutation_Response>;
  /** insert a single row into the table: "invitation_rsvp_answer" */
  insert_invitation_rsvp_answer_one?: Maybe<Invitation_Rsvp_Answer>;
  /** insert data into the table: "invitation_share" */
  insert_invitation_share?: Maybe<Invitation_Share_Mutation_Response>;
  /** insert a single row into the table: "invitation_share" */
  insert_invitation_share_one?: Maybe<Invitation_Share>;
  /** insert data into the table: "invitation_visit_log" */
  insert_invitation_visit_log?: Maybe<Invitation_Visit_Log_Mutation_Response>;
  /** insert a single row into the table: "invitation_visit_log" */
  insert_invitation_visit_log_one?: Maybe<Invitation_Visit_Log>;
  /** insert data into the table: "order" */
  insert_order?: Maybe<Order_Mutation_Response>;
  /** insert a single row into the table: "order" */
  insert_order_one?: Maybe<Order>;
  /** insert data into the table: "sms_verifications" */
  insert_sms_verifications?: Maybe<Sms_Verifications_Mutation_Response>;
  /** insert a single row into the table: "sms_verifications" */
  insert_sms_verifications_one?: Maybe<Sms_Verifications>;
  /** insert data into the table: "template" */
  insert_template?: Maybe<Template_Mutation_Response>;
  /** insert a single row into the table: "template" */
  insert_template_one?: Maybe<Template>;
  /** insert data into the table: "user" */
  insert_user?: Maybe<User_Mutation_Response>;
  /** insert a single row into the table: "user" */
  insert_user_one?: Maybe<User>;
  /** insert data into the table: "user_tokens" */
  insert_user_tokens?: Maybe<User_Tokens_Mutation_Response>;
  /** insert a single row into the table: "user_tokens" */
  insert_user_tokens_one?: Maybe<User_Tokens>;
  /** insert data into the table: "widget" */
  insert_widget?: Maybe<Widget_Mutation_Response>;
  /** insert a single row into the table: "widget" */
  insert_widget_one?: Maybe<Widget>;
  /** insert data into the table: "widget_sticker" */
  insert_widget_sticker?: Maybe<Widget_Sticker_Mutation_Response>;
  /** insert a single row into the table: "widget_sticker" */
  insert_widget_sticker_one?: Maybe<Widget_Sticker>;
  /** update data of the table: "coupon" */
  update_coupon?: Maybe<Coupon_Mutation_Response>;
  /** update single row of the table: "coupon" */
  update_coupon_by_pk?: Maybe<Coupon>;
  /** update multiples rows of table: "coupon" */
  update_coupon_many?: Maybe<Array<Maybe<Coupon_Mutation_Response>>>;
  /** update data of the table: "coupon_using_history" */
  update_coupon_using_history?: Maybe<Coupon_Using_History_Mutation_Response>;
  /** update single row of the table: "coupon_using_history" */
  update_coupon_using_history_by_pk?: Maybe<Coupon_Using_History>;
  /** update multiples rows of table: "coupon_using_history" */
  update_coupon_using_history_many?: Maybe<Array<Maybe<Coupon_Using_History_Mutation_Response>>>;
  /** update data of the table: "invitation" */
  update_invitation?: Maybe<Invitation_Mutation_Response>;
  /** update data of the table: "invitation_attachment" */
  update_invitation_attachment?: Maybe<Invitation_Attachment_Mutation_Response>;
  /** update single row of the table: "invitation_attachment" */
  update_invitation_attachment_by_pk?: Maybe<Invitation_Attachment>;
  /** update multiples rows of table: "invitation_attachment" */
  update_invitation_attachment_many?: Maybe<Array<Maybe<Invitation_Attachment_Mutation_Response>>>;
  /** update single row of the table: "invitation" */
  update_invitation_by_pk?: Maybe<Invitation>;
  /** update data of the table: "invitation_comment" */
  update_invitation_comment?: Maybe<Invitation_Comment_Mutation_Response>;
  /** update single row of the table: "invitation_comment" */
  update_invitation_comment_by_pk?: Maybe<Invitation_Comment>;
  /** update multiples rows of table: "invitation_comment" */
  update_invitation_comment_many?: Maybe<Array<Maybe<Invitation_Comment_Mutation_Response>>>;
  /** update data of the table: "invitation_editor" */
  update_invitation_editor?: Maybe<Invitation_Editor_Mutation_Response>;
  /** update single row of the table: "invitation_editor" */
  update_invitation_editor_by_pk?: Maybe<Invitation_Editor>;
  /** update multiples rows of table: "invitation_editor" */
  update_invitation_editor_many?: Maybe<Array<Maybe<Invitation_Editor_Mutation_Response>>>;
  /** update multiples rows of table: "invitation" */
  update_invitation_many?: Maybe<Array<Maybe<Invitation_Mutation_Response>>>;
  /** update data of the table: "invitation_owner" */
  update_invitation_owner?: Maybe<Invitation_Owner_Mutation_Response>;
  /** update single row of the table: "invitation_owner" */
  update_invitation_owner_by_pk?: Maybe<Invitation_Owner>;
  /** update multiples rows of table: "invitation_owner" */
  update_invitation_owner_many?: Maybe<Array<Maybe<Invitation_Owner_Mutation_Response>>>;
  /** update data of the table: "invitation_rsvp_answer" */
  update_invitation_rsvp_answer?: Maybe<Invitation_Rsvp_Answer_Mutation_Response>;
  /** update single row of the table: "invitation_rsvp_answer" */
  update_invitation_rsvp_answer_by_pk?: Maybe<Invitation_Rsvp_Answer>;
  /** update multiples rows of table: "invitation_rsvp_answer" */
  update_invitation_rsvp_answer_many?: Maybe<Array<Maybe<Invitation_Rsvp_Answer_Mutation_Response>>>;
  /** update data of the table: "invitation_share" */
  update_invitation_share?: Maybe<Invitation_Share_Mutation_Response>;
  /** update single row of the table: "invitation_share" */
  update_invitation_share_by_pk?: Maybe<Invitation_Share>;
  /** update multiples rows of table: "invitation_share" */
  update_invitation_share_many?: Maybe<Array<Maybe<Invitation_Share_Mutation_Response>>>;
  /** update data of the table: "invitation_visit_log" */
  update_invitation_visit_log?: Maybe<Invitation_Visit_Log_Mutation_Response>;
  /** update single row of the table: "invitation_visit_log" */
  update_invitation_visit_log_by_pk?: Maybe<Invitation_Visit_Log>;
  /** update multiples rows of table: "invitation_visit_log" */
  update_invitation_visit_log_many?: Maybe<Array<Maybe<Invitation_Visit_Log_Mutation_Response>>>;
  /** update data of the table: "order" */
  update_order?: Maybe<Order_Mutation_Response>;
  /** update single row of the table: "order" */
  update_order_by_pk?: Maybe<Order>;
  /** update multiples rows of table: "order" */
  update_order_many?: Maybe<Array<Maybe<Order_Mutation_Response>>>;
  /** update data of the table: "sms_verifications" */
  update_sms_verifications?: Maybe<Sms_Verifications_Mutation_Response>;
  /** update single row of the table: "sms_verifications" */
  update_sms_verifications_by_pk?: Maybe<Sms_Verifications>;
  /** update multiples rows of table: "sms_verifications" */
  update_sms_verifications_many?: Maybe<Array<Maybe<Sms_Verifications_Mutation_Response>>>;
  /** update data of the table: "template" */
  update_template?: Maybe<Template_Mutation_Response>;
  /** update single row of the table: "template" */
  update_template_by_pk?: Maybe<Template>;
  /** update multiples rows of table: "template" */
  update_template_many?: Maybe<Array<Maybe<Template_Mutation_Response>>>;
  /** update data of the table: "user" */
  update_user?: Maybe<User_Mutation_Response>;
  /** update single row of the table: "user" */
  update_user_by_pk?: Maybe<User>;
  /** update multiples rows of table: "user" */
  update_user_many?: Maybe<Array<Maybe<User_Mutation_Response>>>;
  /** update data of the table: "user_tokens" */
  update_user_tokens?: Maybe<User_Tokens_Mutation_Response>;
  /** update single row of the table: "user_tokens" */
  update_user_tokens_by_pk?: Maybe<User_Tokens>;
  /** update multiples rows of table: "user_tokens" */
  update_user_tokens_many?: Maybe<Array<Maybe<User_Tokens_Mutation_Response>>>;
  /** update data of the table: "widget" */
  update_widget?: Maybe<Widget_Mutation_Response>;
  /** update single row of the table: "widget" */
  update_widget_by_pk?: Maybe<Widget>;
  /** update multiples rows of table: "widget" */
  update_widget_many?: Maybe<Array<Maybe<Widget_Mutation_Response>>>;
  /** update data of the table: "widget_sticker" */
  update_widget_sticker?: Maybe<Widget_Sticker_Mutation_Response>;
  /** update single row of the table: "widget_sticker" */
  update_widget_sticker_by_pk?: Maybe<Widget_Sticker>;
  /** update multiples rows of table: "widget_sticker" */
  update_widget_sticker_many?: Maybe<Array<Maybe<Widget_Sticker_Mutation_Response>>>;
};


/** mutation root */
export type Mutation_RootDelete_CouponArgs = {
  where: Coupon_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Coupon_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Coupon_Using_HistoryArgs = {
  where: Coupon_Using_History_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Coupon_Using_History_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_InvitationArgs = {
  where: Invitation_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Invitation_AttachmentArgs = {
  where: Invitation_Attachment_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Invitation_Attachment_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Invitation_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Invitation_CommentArgs = {
  where: Invitation_Comment_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Invitation_Comment_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Invitation_EditorArgs = {
  where: Invitation_Editor_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Invitation_Editor_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Invitation_OwnerArgs = {
  where: Invitation_Owner_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Invitation_Owner_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Invitation_Rsvp_AnswerArgs = {
  where: Invitation_Rsvp_Answer_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Invitation_Rsvp_Answer_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Invitation_ShareArgs = {
  where: Invitation_Share_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Invitation_Share_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Invitation_Visit_LogArgs = {
  where: Invitation_Visit_Log_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Invitation_Visit_Log_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


/** mutation root */
export type Mutation_RootDelete_OrderArgs = {
  where: Order_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Order_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Sms_VerificationsArgs = {
  where: Sms_Verifications_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Sms_Verifications_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_TemplateArgs = {
  where: Template_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Template_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_UserArgs = {
  where: User_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_User_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_User_TokensArgs = {
  where: User_Tokens_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_User_Tokens_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_WidgetArgs = {
  where: Widget_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Widget_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_Widget_StickerArgs = {
  where: Widget_Sticker_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Widget_Sticker_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootInsert_CouponArgs = {
  objects: Array<Coupon_Insert_Input>;
  on_conflict?: InputMaybe<Coupon_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Coupon_OneArgs = {
  object: Coupon_Insert_Input;
  on_conflict?: InputMaybe<Coupon_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Coupon_Using_HistoryArgs = {
  objects: Array<Coupon_Using_History_Insert_Input>;
  on_conflict?: InputMaybe<Coupon_Using_History_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Coupon_Using_History_OneArgs = {
  object: Coupon_Using_History_Insert_Input;
  on_conflict?: InputMaybe<Coupon_Using_History_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_InvitationArgs = {
  objects: Array<Invitation_Insert_Input>;
  on_conflict?: InputMaybe<Invitation_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Invitation_AttachmentArgs = {
  objects: Array<Invitation_Attachment_Insert_Input>;
  on_conflict?: InputMaybe<Invitation_Attachment_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Invitation_Attachment_OneArgs = {
  object: Invitation_Attachment_Insert_Input;
  on_conflict?: InputMaybe<Invitation_Attachment_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Invitation_CommentArgs = {
  objects: Array<Invitation_Comment_Insert_Input>;
  on_conflict?: InputMaybe<Invitation_Comment_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Invitation_Comment_OneArgs = {
  object: Invitation_Comment_Insert_Input;
  on_conflict?: InputMaybe<Invitation_Comment_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Invitation_EditorArgs = {
  objects: Array<Invitation_Editor_Insert_Input>;
  on_conflict?: InputMaybe<Invitation_Editor_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Invitation_Editor_OneArgs = {
  object: Invitation_Editor_Insert_Input;
  on_conflict?: InputMaybe<Invitation_Editor_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Invitation_OneArgs = {
  object: Invitation_Insert_Input;
  on_conflict?: InputMaybe<Invitation_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Invitation_OwnerArgs = {
  objects: Array<Invitation_Owner_Insert_Input>;
  on_conflict?: InputMaybe<Invitation_Owner_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Invitation_Owner_OneArgs = {
  object: Invitation_Owner_Insert_Input;
  on_conflict?: InputMaybe<Invitation_Owner_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Invitation_Rsvp_AnswerArgs = {
  objects: Array<Invitation_Rsvp_Answer_Insert_Input>;
  on_conflict?: InputMaybe<Invitation_Rsvp_Answer_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Invitation_Rsvp_Answer_OneArgs = {
  object: Invitation_Rsvp_Answer_Insert_Input;
  on_conflict?: InputMaybe<Invitation_Rsvp_Answer_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Invitation_ShareArgs = {
  objects: Array<Invitation_Share_Insert_Input>;
  on_conflict?: InputMaybe<Invitation_Share_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Invitation_Share_OneArgs = {
  object: Invitation_Share_Insert_Input;
  on_conflict?: InputMaybe<Invitation_Share_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Invitation_Visit_LogArgs = {
  objects: Array<Invitation_Visit_Log_Insert_Input>;
  on_conflict?: InputMaybe<Invitation_Visit_Log_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Invitation_Visit_Log_OneArgs = {
  object: Invitation_Visit_Log_Insert_Input;
  on_conflict?: InputMaybe<Invitation_Visit_Log_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_OrderArgs = {
  objects: Array<Order_Insert_Input>;
  on_conflict?: InputMaybe<Order_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Order_OneArgs = {
  object: Order_Insert_Input;
  on_conflict?: InputMaybe<Order_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Sms_VerificationsArgs = {
  objects: Array<Sms_Verifications_Insert_Input>;
  on_conflict?: InputMaybe<Sms_Verifications_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Sms_Verifications_OneArgs = {
  object: Sms_Verifications_Insert_Input;
  on_conflict?: InputMaybe<Sms_Verifications_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_TemplateArgs = {
  objects: Array<Template_Insert_Input>;
  on_conflict?: InputMaybe<Template_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Template_OneArgs = {
  object: Template_Insert_Input;
  on_conflict?: InputMaybe<Template_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UserArgs = {
  objects: Array<User_Insert_Input>;
  on_conflict?: InputMaybe<User_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_OneArgs = {
  object: User_Insert_Input;
  on_conflict?: InputMaybe<User_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_TokensArgs = {
  objects: Array<User_Tokens_Insert_Input>;
  on_conflict?: InputMaybe<User_Tokens_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_Tokens_OneArgs = {
  object: User_Tokens_Insert_Input;
  on_conflict?: InputMaybe<User_Tokens_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_WidgetArgs = {
  objects: Array<Widget_Insert_Input>;
  on_conflict?: InputMaybe<Widget_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Widget_OneArgs = {
  object: Widget_Insert_Input;
  on_conflict?: InputMaybe<Widget_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Widget_StickerArgs = {
  objects: Array<Widget_Sticker_Insert_Input>;
  on_conflict?: InputMaybe<Widget_Sticker_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Widget_Sticker_OneArgs = {
  object: Widget_Sticker_Insert_Input;
  on_conflict?: InputMaybe<Widget_Sticker_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_CouponArgs = {
  _inc?: InputMaybe<Coupon_Inc_Input>;
  _set?: InputMaybe<Coupon_Set_Input>;
  where: Coupon_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Coupon_By_PkArgs = {
  _inc?: InputMaybe<Coupon_Inc_Input>;
  _set?: InputMaybe<Coupon_Set_Input>;
  pk_columns: Coupon_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Coupon_ManyArgs = {
  updates: Array<Coupon_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Coupon_Using_HistoryArgs = {
  _set?: InputMaybe<Coupon_Using_History_Set_Input>;
  where: Coupon_Using_History_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Coupon_Using_History_By_PkArgs = {
  _set?: InputMaybe<Coupon_Using_History_Set_Input>;
  pk_columns: Coupon_Using_History_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Coupon_Using_History_ManyArgs = {
  updates: Array<Coupon_Using_History_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_InvitationArgs = {
  _set?: InputMaybe<Invitation_Set_Input>;
  where: Invitation_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Invitation_AttachmentArgs = {
  _inc?: InputMaybe<Invitation_Attachment_Inc_Input>;
  _set?: InputMaybe<Invitation_Attachment_Set_Input>;
  where: Invitation_Attachment_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Invitation_Attachment_By_PkArgs = {
  _inc?: InputMaybe<Invitation_Attachment_Inc_Input>;
  _set?: InputMaybe<Invitation_Attachment_Set_Input>;
  pk_columns: Invitation_Attachment_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Invitation_Attachment_ManyArgs = {
  updates: Array<Invitation_Attachment_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Invitation_By_PkArgs = {
  _set?: InputMaybe<Invitation_Set_Input>;
  pk_columns: Invitation_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Invitation_CommentArgs = {
  _set?: InputMaybe<Invitation_Comment_Set_Input>;
  where: Invitation_Comment_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Invitation_Comment_By_PkArgs = {
  _set?: InputMaybe<Invitation_Comment_Set_Input>;
  pk_columns: Invitation_Comment_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Invitation_Comment_ManyArgs = {
  updates: Array<Invitation_Comment_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Invitation_EditorArgs = {
  _set?: InputMaybe<Invitation_Editor_Set_Input>;
  where: Invitation_Editor_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Invitation_Editor_By_PkArgs = {
  _set?: InputMaybe<Invitation_Editor_Set_Input>;
  pk_columns: Invitation_Editor_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Invitation_Editor_ManyArgs = {
  updates: Array<Invitation_Editor_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Invitation_ManyArgs = {
  updates: Array<Invitation_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Invitation_OwnerArgs = {
  _inc?: InputMaybe<Invitation_Owner_Inc_Input>;
  _set?: InputMaybe<Invitation_Owner_Set_Input>;
  where: Invitation_Owner_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Invitation_Owner_By_PkArgs = {
  _inc?: InputMaybe<Invitation_Owner_Inc_Input>;
  _set?: InputMaybe<Invitation_Owner_Set_Input>;
  pk_columns: Invitation_Owner_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Invitation_Owner_ManyArgs = {
  updates: Array<Invitation_Owner_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Invitation_Rsvp_AnswerArgs = {
  _append?: InputMaybe<Invitation_Rsvp_Answer_Append_Input>;
  _delete_at_path?: InputMaybe<Invitation_Rsvp_Answer_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Invitation_Rsvp_Answer_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Invitation_Rsvp_Answer_Delete_Key_Input>;
  _prepend?: InputMaybe<Invitation_Rsvp_Answer_Prepend_Input>;
  _set?: InputMaybe<Invitation_Rsvp_Answer_Set_Input>;
  where: Invitation_Rsvp_Answer_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Invitation_Rsvp_Answer_By_PkArgs = {
  _append?: InputMaybe<Invitation_Rsvp_Answer_Append_Input>;
  _delete_at_path?: InputMaybe<Invitation_Rsvp_Answer_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Invitation_Rsvp_Answer_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Invitation_Rsvp_Answer_Delete_Key_Input>;
  _prepend?: InputMaybe<Invitation_Rsvp_Answer_Prepend_Input>;
  _set?: InputMaybe<Invitation_Rsvp_Answer_Set_Input>;
  pk_columns: Invitation_Rsvp_Answer_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Invitation_Rsvp_Answer_ManyArgs = {
  updates: Array<Invitation_Rsvp_Answer_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Invitation_ShareArgs = {
  _set?: InputMaybe<Invitation_Share_Set_Input>;
  where: Invitation_Share_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Invitation_Share_By_PkArgs = {
  _set?: InputMaybe<Invitation_Share_Set_Input>;
  pk_columns: Invitation_Share_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Invitation_Share_ManyArgs = {
  updates: Array<Invitation_Share_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Invitation_Visit_LogArgs = {
  _inc?: InputMaybe<Invitation_Visit_Log_Inc_Input>;
  _set?: InputMaybe<Invitation_Visit_Log_Set_Input>;
  where: Invitation_Visit_Log_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Invitation_Visit_Log_By_PkArgs = {
  _inc?: InputMaybe<Invitation_Visit_Log_Inc_Input>;
  _set?: InputMaybe<Invitation_Visit_Log_Set_Input>;
  pk_columns: Invitation_Visit_Log_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Invitation_Visit_Log_ManyArgs = {
  updates: Array<Invitation_Visit_Log_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_OrderArgs = {
  _set?: InputMaybe<Order_Set_Input>;
  where: Order_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Order_By_PkArgs = {
  _set?: InputMaybe<Order_Set_Input>;
  pk_columns: Order_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Order_ManyArgs = {
  updates: Array<Order_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Sms_VerificationsArgs = {
  _set?: InputMaybe<Sms_Verifications_Set_Input>;
  where: Sms_Verifications_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Sms_Verifications_By_PkArgs = {
  _set?: InputMaybe<Sms_Verifications_Set_Input>;
  pk_columns: Sms_Verifications_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Sms_Verifications_ManyArgs = {
  updates: Array<Sms_Verifications_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_TemplateArgs = {
  _inc?: InputMaybe<Template_Inc_Input>;
  _set?: InputMaybe<Template_Set_Input>;
  where: Template_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Template_By_PkArgs = {
  _inc?: InputMaybe<Template_Inc_Input>;
  _set?: InputMaybe<Template_Set_Input>;
  pk_columns: Template_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Template_ManyArgs = {
  updates: Array<Template_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_UserArgs = {
  _set?: InputMaybe<User_Set_Input>;
  where: User_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_User_By_PkArgs = {
  _set?: InputMaybe<User_Set_Input>;
  pk_columns: User_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_User_ManyArgs = {
  updates: Array<User_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_User_TokensArgs = {
  _set?: InputMaybe<User_Tokens_Set_Input>;
  where: User_Tokens_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_User_Tokens_By_PkArgs = {
  _set?: InputMaybe<User_Tokens_Set_Input>;
  pk_columns: User_Tokens_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_User_Tokens_ManyArgs = {
  updates: Array<User_Tokens_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_WidgetArgs = {
  _append?: InputMaybe<Widget_Append_Input>;
  _delete_at_path?: InputMaybe<Widget_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Widget_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Widget_Delete_Key_Input>;
  _inc?: InputMaybe<Widget_Inc_Input>;
  _prepend?: InputMaybe<Widget_Prepend_Input>;
  _set?: InputMaybe<Widget_Set_Input>;
  where: Widget_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Widget_By_PkArgs = {
  _append?: InputMaybe<Widget_Append_Input>;
  _delete_at_path?: InputMaybe<Widget_Delete_At_Path_Input>;
  _delete_elem?: InputMaybe<Widget_Delete_Elem_Input>;
  _delete_key?: InputMaybe<Widget_Delete_Key_Input>;
  _inc?: InputMaybe<Widget_Inc_Input>;
  _prepend?: InputMaybe<Widget_Prepend_Input>;
  _set?: InputMaybe<Widget_Set_Input>;
  pk_columns: Widget_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Widget_ManyArgs = {
  updates: Array<Widget_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_Widget_StickerArgs = {
  _inc?: InputMaybe<Widget_Sticker_Inc_Input>;
  _set?: InputMaybe<Widget_Sticker_Set_Input>;
  where: Widget_Sticker_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Widget_Sticker_By_PkArgs = {
  _inc?: InputMaybe<Widget_Sticker_Inc_Input>;
  _set?: InputMaybe<Widget_Sticker_Set_Input>;
  pk_columns: Widget_Sticker_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Widget_Sticker_ManyArgs = {
  updates: Array<Widget_Sticker_Updates>;
};

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['numeric']['input']>;
  _gt?: InputMaybe<Scalars['numeric']['input']>;
  _gte?: InputMaybe<Scalars['numeric']['input']>;
  _in?: InputMaybe<Array<Scalars['numeric']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['numeric']['input']>;
  _lte?: InputMaybe<Scalars['numeric']['input']>;
  _neq?: InputMaybe<Scalars['numeric']['input']>;
  _nin?: InputMaybe<Array<Scalars['numeric']['input']>>;
};

/** columns and relationships of "order" */
export type Order = {
  __typename?: 'order';
  /** An array relationship */
  coupon_using_histories: Array<Coupon_Using_History>;
  /** An aggregate relationship */
  coupon_using_histories_aggregate: Coupon_Using_History_Aggregate;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id: Scalars['uuid']['output'];
  /** An object relationship */
  invitation?: Maybe<Invitation>;
  invitation_id?: Maybe<Scalars['uuid']['output']>;
  payment_key?: Maybe<Scalars['String']['output']>;
  plan?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};


/** columns and relationships of "order" */
export type OrderCoupon_Using_HistoriesArgs = {
  distinct_on?: InputMaybe<Array<Coupon_Using_History_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Coupon_Using_History_Order_By>>;
  where?: InputMaybe<Coupon_Using_History_Bool_Exp>;
};


/** columns and relationships of "order" */
export type OrderCoupon_Using_Histories_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Coupon_Using_History_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Coupon_Using_History_Order_By>>;
  where?: InputMaybe<Coupon_Using_History_Bool_Exp>;
};

/** aggregated selection of "order" */
export type Order_Aggregate = {
  __typename?: 'order_aggregate';
  aggregate?: Maybe<Order_Aggregate_Fields>;
  nodes: Array<Order>;
};

export type Order_Aggregate_Bool_Exp = {
  count?: InputMaybe<Order_Aggregate_Bool_Exp_Count>;
};

export type Order_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Order_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Order_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "order" */
export type Order_Aggregate_Fields = {
  __typename?: 'order_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Order_Max_Fields>;
  min?: Maybe<Order_Min_Fields>;
};


/** aggregate fields of "order" */
export type Order_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Order_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "order" */
export type Order_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Order_Max_Order_By>;
  min?: InputMaybe<Order_Min_Order_By>;
};

/** input type for inserting array relation for remote table "order" */
export type Order_Arr_Rel_Insert_Input = {
  data: Array<Order_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Order_On_Conflict>;
};

/** Boolean expression to filter rows from the table "order". All fields are combined with a logical 'AND'. */
export type Order_Bool_Exp = {
  _and?: InputMaybe<Array<Order_Bool_Exp>>;
  _not?: InputMaybe<Order_Bool_Exp>;
  _or?: InputMaybe<Array<Order_Bool_Exp>>;
  coupon_using_histories?: InputMaybe<Coupon_Using_History_Bool_Exp>;
  coupon_using_histories_aggregate?: InputMaybe<Coupon_Using_History_Aggregate_Bool_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  invitation?: InputMaybe<Invitation_Bool_Exp>;
  invitation_id?: InputMaybe<Uuid_Comparison_Exp>;
  payment_key?: InputMaybe<String_Comparison_Exp>;
  plan?: InputMaybe<String_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** unique or primary key constraints on table "order" */
export enum Order_Constraint {
  /** unique or primary key constraint on columns "id" */
  OrderPkey = 'order_pkey'
}

/** input type for inserting data into table "order" */
export type Order_Insert_Input = {
  coupon_using_histories?: InputMaybe<Coupon_Using_History_Arr_Rel_Insert_Input>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  invitation?: InputMaybe<Invitation_Obj_Rel_Insert_Input>;
  invitation_id?: InputMaybe<Scalars['uuid']['input']>;
  payment_key?: InputMaybe<Scalars['String']['input']>;
  plan?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Order_Max_Fields = {
  __typename?: 'order_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  invitation_id?: Maybe<Scalars['uuid']['output']>;
  payment_key?: Maybe<Scalars['String']['output']>;
  plan?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "order" */
export type Order_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  invitation_id?: InputMaybe<Order_By>;
  payment_key?: InputMaybe<Order_By>;
  plan?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Order_Min_Fields = {
  __typename?: 'order_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  invitation_id?: Maybe<Scalars['uuid']['output']>;
  payment_key?: Maybe<Scalars['String']['output']>;
  plan?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "order" */
export type Order_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  invitation_id?: InputMaybe<Order_By>;
  payment_key?: InputMaybe<Order_By>;
  plan?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "order" */
export type Order_Mutation_Response = {
  __typename?: 'order_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Order>;
};

/** input type for inserting object relation for remote table "order" */
export type Order_Obj_Rel_Insert_Input = {
  data: Order_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Order_On_Conflict>;
};

/** on_conflict condition type for table "order" */
export type Order_On_Conflict = {
  constraint: Order_Constraint;
  update_columns?: Array<Order_Update_Column>;
  where?: InputMaybe<Order_Bool_Exp>;
};

/** Ordering options when selecting data from "order". */
export type Order_Order_By = {
  coupon_using_histories_aggregate?: InputMaybe<Coupon_Using_History_Aggregate_Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  invitation?: InputMaybe<Invitation_Order_By>;
  invitation_id?: InputMaybe<Order_By>;
  payment_key?: InputMaybe<Order_By>;
  plan?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: order */
export type Order_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "order" */
export enum Order_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  InvitationId = 'invitation_id',
  /** column name */
  PaymentKey = 'payment_key',
  /** column name */
  Plan = 'plan',
  /** column name */
  Status = 'status',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "order" */
export type Order_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  invitation_id?: InputMaybe<Scalars['uuid']['input']>;
  payment_key?: InputMaybe<Scalars['String']['input']>;
  plan?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** Streaming cursor of the table "order" */
export type Order_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Order_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Order_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  invitation_id?: InputMaybe<Scalars['uuid']['input']>;
  payment_key?: InputMaybe<Scalars['String']['input']>;
  plan?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** update columns of table "order" */
export enum Order_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  InvitationId = 'invitation_id',
  /** column name */
  PaymentKey = 'payment_key',
  /** column name */
  Plan = 'plan',
  /** column name */
  Status = 'status',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Order_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Order_Set_Input>;
  /** filter the rows which have to be updated */
  where: Order_Bool_Exp;
};

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "coupon" */
  coupon: Array<Coupon>;
  /** fetch aggregated fields from the table: "coupon" */
  coupon_aggregate: Coupon_Aggregate;
  /** fetch data from the table: "coupon" using primary key columns */
  coupon_by_pk?: Maybe<Coupon>;
  /** fetch data from the table: "coupon_using_history" */
  coupon_using_history: Array<Coupon_Using_History>;
  /** fetch aggregated fields from the table: "coupon_using_history" */
  coupon_using_history_aggregate: Coupon_Using_History_Aggregate;
  /** fetch data from the table: "coupon_using_history" using primary key columns */
  coupon_using_history_by_pk?: Maybe<Coupon_Using_History>;
  /** fetch data from the table: "invitation" */
  invitation: Array<Invitation>;
  /** fetch aggregated fields from the table: "invitation" */
  invitation_aggregate: Invitation_Aggregate;
  /** fetch data from the table: "invitation_attachment" */
  invitation_attachment: Array<Invitation_Attachment>;
  /** fetch aggregated fields from the table: "invitation_attachment" */
  invitation_attachment_aggregate: Invitation_Attachment_Aggregate;
  /** fetch data from the table: "invitation_attachment" using primary key columns */
  invitation_attachment_by_pk?: Maybe<Invitation_Attachment>;
  /** fetch data from the table: "invitation" using primary key columns */
  invitation_by_pk?: Maybe<Invitation>;
  /** fetch data from the table: "invitation_comment" */
  invitation_comment: Array<Invitation_Comment>;
  /** fetch aggregated fields from the table: "invitation_comment" */
  invitation_comment_aggregate: Invitation_Comment_Aggregate;
  /** fetch data from the table: "invitation_comment" using primary key columns */
  invitation_comment_by_pk?: Maybe<Invitation_Comment>;
  /** fetch data from the table: "invitation_editor" */
  invitation_editor: Array<Invitation_Editor>;
  /** fetch aggregated fields from the table: "invitation_editor" */
  invitation_editor_aggregate: Invitation_Editor_Aggregate;
  /** fetch data from the table: "invitation_editor" using primary key columns */
  invitation_editor_by_pk?: Maybe<Invitation_Editor>;
  /** fetch data from the table: "invitation_owner" */
  invitation_owner: Array<Invitation_Owner>;
  /** fetch aggregated fields from the table: "invitation_owner" */
  invitation_owner_aggregate: Invitation_Owner_Aggregate;
  /** fetch data from the table: "invitation_owner" using primary key columns */
  invitation_owner_by_pk?: Maybe<Invitation_Owner>;
  /** fetch data from the table: "invitation_rsvp_answer" */
  invitation_rsvp_answer: Array<Invitation_Rsvp_Answer>;
  /** fetch aggregated fields from the table: "invitation_rsvp_answer" */
  invitation_rsvp_answer_aggregate: Invitation_Rsvp_Answer_Aggregate;
  /** fetch data from the table: "invitation_rsvp_answer" using primary key columns */
  invitation_rsvp_answer_by_pk?: Maybe<Invitation_Rsvp_Answer>;
  /** fetch data from the table: "invitation_share" */
  invitation_share: Array<Invitation_Share>;
  /** fetch aggregated fields from the table: "invitation_share" */
  invitation_share_aggregate: Invitation_Share_Aggregate;
  /** fetch data from the table: "invitation_share" using primary key columns */
  invitation_share_by_pk?: Maybe<Invitation_Share>;
  /** fetch data from the table: "invitation_visit_log" */
  invitation_visit_log: Array<Invitation_Visit_Log>;
  /** fetch aggregated fields from the table: "invitation_visit_log" */
  invitation_visit_log_aggregate: Invitation_Visit_Log_Aggregate;
  /** fetch data from the table: "invitation_visit_log" using primary key columns */
  invitation_visit_log_by_pk?: Maybe<Invitation_Visit_Log>;
  /** fetch data from the table: "order" */
  order: Array<Order>;
  /** fetch aggregated fields from the table: "order" */
  order_aggregate: Order_Aggregate;
  /** fetch data from the table: "order" using primary key columns */
  order_by_pk?: Maybe<Order>;
  /** An array relationship */
  sms_verifications: Array<Sms_Verifications>;
  /** An aggregate relationship */
  sms_verifications_aggregate: Sms_Verifications_Aggregate;
  /** fetch data from the table: "sms_verifications" using primary key columns */
  sms_verifications_by_pk?: Maybe<Sms_Verifications>;
  /** fetch data from the table: "template" */
  template: Array<Template>;
  /** fetch aggregated fields from the table: "template" */
  template_aggregate: Template_Aggregate;
  /** fetch data from the table: "template" using primary key columns */
  template_by_pk?: Maybe<Template>;
  /** fetch data from the table: "user" */
  user: Array<User>;
  /** fetch aggregated fields from the table: "user" */
  user_aggregate: User_Aggregate;
  /** fetch data from the table: "user" using primary key columns */
  user_by_pk?: Maybe<User>;
  /** An array relationship */
  user_tokens: Array<User_Tokens>;
  /** An aggregate relationship */
  user_tokens_aggregate: User_Tokens_Aggregate;
  /** fetch data from the table: "user_tokens" using primary key columns */
  user_tokens_by_pk?: Maybe<User_Tokens>;
  /** fetch data from the table: "widget" */
  widget: Array<Widget>;
  /** fetch aggregated fields from the table: "widget" */
  widget_aggregate: Widget_Aggregate;
  /** fetch data from the table: "widget" using primary key columns */
  widget_by_pk?: Maybe<Widget>;
  /** fetch data from the table: "widget_sticker" */
  widget_sticker: Array<Widget_Sticker>;
  /** fetch aggregated fields from the table: "widget_sticker" */
  widget_sticker_aggregate: Widget_Sticker_Aggregate;
  /** fetch data from the table: "widget_sticker" using primary key columns */
  widget_sticker_by_pk?: Maybe<Widget_Sticker>;
};


export type Query_RootCouponArgs = {
  distinct_on?: InputMaybe<Array<Coupon_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Coupon_Order_By>>;
  where?: InputMaybe<Coupon_Bool_Exp>;
};


export type Query_RootCoupon_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Coupon_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Coupon_Order_By>>;
  where?: InputMaybe<Coupon_Bool_Exp>;
};


export type Query_RootCoupon_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootCoupon_Using_HistoryArgs = {
  distinct_on?: InputMaybe<Array<Coupon_Using_History_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Coupon_Using_History_Order_By>>;
  where?: InputMaybe<Coupon_Using_History_Bool_Exp>;
};


export type Query_RootCoupon_Using_History_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Coupon_Using_History_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Coupon_Using_History_Order_By>>;
  where?: InputMaybe<Coupon_Using_History_Bool_Exp>;
};


export type Query_RootCoupon_Using_History_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootInvitationArgs = {
  distinct_on?: InputMaybe<Array<Invitation_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Invitation_Order_By>>;
  where?: InputMaybe<Invitation_Bool_Exp>;
};


export type Query_RootInvitation_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Invitation_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Invitation_Order_By>>;
  where?: InputMaybe<Invitation_Bool_Exp>;
};


export type Query_RootInvitation_AttachmentArgs = {
  distinct_on?: InputMaybe<Array<Invitation_Attachment_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Invitation_Attachment_Order_By>>;
  where?: InputMaybe<Invitation_Attachment_Bool_Exp>;
};


export type Query_RootInvitation_Attachment_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Invitation_Attachment_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Invitation_Attachment_Order_By>>;
  where?: InputMaybe<Invitation_Attachment_Bool_Exp>;
};


export type Query_RootInvitation_Attachment_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootInvitation_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootInvitation_CommentArgs = {
  distinct_on?: InputMaybe<Array<Invitation_Comment_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Invitation_Comment_Order_By>>;
  where?: InputMaybe<Invitation_Comment_Bool_Exp>;
};


export type Query_RootInvitation_Comment_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Invitation_Comment_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Invitation_Comment_Order_By>>;
  where?: InputMaybe<Invitation_Comment_Bool_Exp>;
};


export type Query_RootInvitation_Comment_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootInvitation_EditorArgs = {
  distinct_on?: InputMaybe<Array<Invitation_Editor_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Invitation_Editor_Order_By>>;
  where?: InputMaybe<Invitation_Editor_Bool_Exp>;
};


export type Query_RootInvitation_Editor_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Invitation_Editor_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Invitation_Editor_Order_By>>;
  where?: InputMaybe<Invitation_Editor_Bool_Exp>;
};


export type Query_RootInvitation_Editor_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootInvitation_OwnerArgs = {
  distinct_on?: InputMaybe<Array<Invitation_Owner_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Invitation_Owner_Order_By>>;
  where?: InputMaybe<Invitation_Owner_Bool_Exp>;
};


export type Query_RootInvitation_Owner_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Invitation_Owner_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Invitation_Owner_Order_By>>;
  where?: InputMaybe<Invitation_Owner_Bool_Exp>;
};


export type Query_RootInvitation_Owner_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootInvitation_Rsvp_AnswerArgs = {
  distinct_on?: InputMaybe<Array<Invitation_Rsvp_Answer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Invitation_Rsvp_Answer_Order_By>>;
  where?: InputMaybe<Invitation_Rsvp_Answer_Bool_Exp>;
};


export type Query_RootInvitation_Rsvp_Answer_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Invitation_Rsvp_Answer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Invitation_Rsvp_Answer_Order_By>>;
  where?: InputMaybe<Invitation_Rsvp_Answer_Bool_Exp>;
};


export type Query_RootInvitation_Rsvp_Answer_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootInvitation_ShareArgs = {
  distinct_on?: InputMaybe<Array<Invitation_Share_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Invitation_Share_Order_By>>;
  where?: InputMaybe<Invitation_Share_Bool_Exp>;
};


export type Query_RootInvitation_Share_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Invitation_Share_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Invitation_Share_Order_By>>;
  where?: InputMaybe<Invitation_Share_Bool_Exp>;
};


export type Query_RootInvitation_Share_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootInvitation_Visit_LogArgs = {
  distinct_on?: InputMaybe<Array<Invitation_Visit_Log_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Invitation_Visit_Log_Order_By>>;
  where?: InputMaybe<Invitation_Visit_Log_Bool_Exp>;
};


export type Query_RootInvitation_Visit_Log_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Invitation_Visit_Log_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Invitation_Visit_Log_Order_By>>;
  where?: InputMaybe<Invitation_Visit_Log_Bool_Exp>;
};


export type Query_RootInvitation_Visit_Log_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Query_RootOrderArgs = {
  distinct_on?: InputMaybe<Array<Order_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Order_Order_By>>;
  where?: InputMaybe<Order_Bool_Exp>;
};


export type Query_RootOrder_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Order_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Order_Order_By>>;
  where?: InputMaybe<Order_Bool_Exp>;
};


export type Query_RootOrder_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootSms_VerificationsArgs = {
  distinct_on?: InputMaybe<Array<Sms_Verifications_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Sms_Verifications_Order_By>>;
  where?: InputMaybe<Sms_Verifications_Bool_Exp>;
};


export type Query_RootSms_Verifications_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Sms_Verifications_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Sms_Verifications_Order_By>>;
  where?: InputMaybe<Sms_Verifications_Bool_Exp>;
};


export type Query_RootSms_Verifications_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootTemplateArgs = {
  distinct_on?: InputMaybe<Array<Template_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Template_Order_By>>;
  where?: InputMaybe<Template_Bool_Exp>;
};


export type Query_RootTemplate_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Template_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Template_Order_By>>;
  where?: InputMaybe<Template_Bool_Exp>;
};


export type Query_RootTemplate_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootUserArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};


export type Query_RootUser_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};


export type Query_RootUser_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootUser_TokensArgs = {
  distinct_on?: InputMaybe<Array<User_Tokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Tokens_Order_By>>;
  where?: InputMaybe<User_Tokens_Bool_Exp>;
};


export type Query_RootUser_Tokens_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Tokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Tokens_Order_By>>;
  where?: InputMaybe<User_Tokens_Bool_Exp>;
};


export type Query_RootUser_Tokens_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootWidgetArgs = {
  distinct_on?: InputMaybe<Array<Widget_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Widget_Order_By>>;
  where?: InputMaybe<Widget_Bool_Exp>;
};


export type Query_RootWidget_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Widget_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Widget_Order_By>>;
  where?: InputMaybe<Widget_Bool_Exp>;
};


export type Query_RootWidget_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootWidget_StickerArgs = {
  distinct_on?: InputMaybe<Array<Widget_Sticker_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Widget_Sticker_Order_By>>;
  where?: InputMaybe<Widget_Sticker_Bool_Exp>;
};


export type Query_RootWidget_Sticker_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Widget_Sticker_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Widget_Sticker_Order_By>>;
  where?: InputMaybe<Widget_Sticker_Bool_Exp>;
};


export type Query_RootWidget_Sticker_By_PkArgs = {
  id: Scalars['uuid']['input'];
};

/** columns and relationships of "sms_verifications" */
export type Sms_Verifications = {
  __typename?: 'sms_verifications';
  code: Scalars['String']['output'];
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  expires_at: Scalars['timestamptz']['output'];
  id: Scalars['uuid']['output'];
  phone: Scalars['String']['output'];
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  /** An object relationship */
  user?: Maybe<User>;
  user_id?: Maybe<Scalars['uuid']['output']>;
  verified?: Maybe<Scalars['Boolean']['output']>;
};

/** aggregated selection of "sms_verifications" */
export type Sms_Verifications_Aggregate = {
  __typename?: 'sms_verifications_aggregate';
  aggregate?: Maybe<Sms_Verifications_Aggregate_Fields>;
  nodes: Array<Sms_Verifications>;
};

export type Sms_Verifications_Aggregate_Bool_Exp = {
  bool_and?: InputMaybe<Sms_Verifications_Aggregate_Bool_Exp_Bool_And>;
  bool_or?: InputMaybe<Sms_Verifications_Aggregate_Bool_Exp_Bool_Or>;
  count?: InputMaybe<Sms_Verifications_Aggregate_Bool_Exp_Count>;
};

export type Sms_Verifications_Aggregate_Bool_Exp_Bool_And = {
  arguments: Sms_Verifications_Select_Column_Sms_Verifications_Aggregate_Bool_Exp_Bool_And_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Sms_Verifications_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Sms_Verifications_Aggregate_Bool_Exp_Bool_Or = {
  arguments: Sms_Verifications_Select_Column_Sms_Verifications_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Sms_Verifications_Bool_Exp>;
  predicate: Boolean_Comparison_Exp;
};

export type Sms_Verifications_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Sms_Verifications_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Sms_Verifications_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "sms_verifications" */
export type Sms_Verifications_Aggregate_Fields = {
  __typename?: 'sms_verifications_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Sms_Verifications_Max_Fields>;
  min?: Maybe<Sms_Verifications_Min_Fields>;
};


/** aggregate fields of "sms_verifications" */
export type Sms_Verifications_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Sms_Verifications_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "sms_verifications" */
export type Sms_Verifications_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Sms_Verifications_Max_Order_By>;
  min?: InputMaybe<Sms_Verifications_Min_Order_By>;
};

/** input type for inserting array relation for remote table "sms_verifications" */
export type Sms_Verifications_Arr_Rel_Insert_Input = {
  data: Array<Sms_Verifications_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Sms_Verifications_On_Conflict>;
};

/** Boolean expression to filter rows from the table "sms_verifications". All fields are combined with a logical 'AND'. */
export type Sms_Verifications_Bool_Exp = {
  _and?: InputMaybe<Array<Sms_Verifications_Bool_Exp>>;
  _not?: InputMaybe<Sms_Verifications_Bool_Exp>;
  _or?: InputMaybe<Array<Sms_Verifications_Bool_Exp>>;
  code?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  expires_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  phone?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<User_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
  verified?: InputMaybe<Boolean_Comparison_Exp>;
};

/** unique or primary key constraints on table "sms_verifications" */
export enum Sms_Verifications_Constraint {
  /** unique or primary key constraint on columns "id" */
  SmsVerificationsPkey = 'sms_verifications_pkey'
}

/** input type for inserting data into table "sms_verifications" */
export type Sms_Verifications_Insert_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  expires_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user?: InputMaybe<User_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
  verified?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate max on columns */
export type Sms_Verifications_Max_Fields = {
  __typename?: 'sms_verifications_max_fields';
  code?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  expires_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "sms_verifications" */
export type Sms_Verifications_Max_Order_By = {
  code?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  expires_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  phone?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Sms_Verifications_Min_Fields = {
  __typename?: 'sms_verifications_min_fields';
  code?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  expires_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "sms_verifications" */
export type Sms_Verifications_Min_Order_By = {
  code?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  expires_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  phone?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "sms_verifications" */
export type Sms_Verifications_Mutation_Response = {
  __typename?: 'sms_verifications_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Sms_Verifications>;
};

/** on_conflict condition type for table "sms_verifications" */
export type Sms_Verifications_On_Conflict = {
  constraint: Sms_Verifications_Constraint;
  update_columns?: Array<Sms_Verifications_Update_Column>;
  where?: InputMaybe<Sms_Verifications_Bool_Exp>;
};

/** Ordering options when selecting data from "sms_verifications". */
export type Sms_Verifications_Order_By = {
  code?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  expires_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  phone?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<User_Order_By>;
  user_id?: InputMaybe<Order_By>;
  verified?: InputMaybe<Order_By>;
};

/** primary key columns input for table: sms_verifications */
export type Sms_Verifications_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "sms_verifications" */
export enum Sms_Verifications_Select_Column {
  /** column name */
  Code = 'code',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  ExpiresAt = 'expires_at',
  /** column name */
  Id = 'id',
  /** column name */
  Phone = 'phone',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id',
  /** column name */
  Verified = 'verified'
}

/** select "sms_verifications_aggregate_bool_exp_bool_and_arguments_columns" columns of table "sms_verifications" */
export enum Sms_Verifications_Select_Column_Sms_Verifications_Aggregate_Bool_Exp_Bool_And_Arguments_Columns {
  /** column name */
  Verified = 'verified'
}

/** select "sms_verifications_aggregate_bool_exp_bool_or_arguments_columns" columns of table "sms_verifications" */
export enum Sms_Verifications_Select_Column_Sms_Verifications_Aggregate_Bool_Exp_Bool_Or_Arguments_Columns {
  /** column name */
  Verified = 'verified'
}

/** input type for updating data in table "sms_verifications" */
export type Sms_Verifications_Set_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  expires_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
  verified?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Streaming cursor of the table "sms_verifications" */
export type Sms_Verifications_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Sms_Verifications_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Sms_Verifications_Stream_Cursor_Value_Input = {
  code?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  expires_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
  verified?: InputMaybe<Scalars['Boolean']['input']>;
};

/** update columns of table "sms_verifications" */
export enum Sms_Verifications_Update_Column {
  /** column name */
  Code = 'code',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  ExpiresAt = 'expires_at',
  /** column name */
  Id = 'id',
  /** column name */
  Phone = 'phone',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id',
  /** column name */
  Verified = 'verified'
}

export type Sms_Verifications_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Sms_Verifications_Set_Input>;
  /** filter the rows which have to be updated */
  where: Sms_Verifications_Bool_Exp;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "coupon" */
  coupon: Array<Coupon>;
  /** fetch aggregated fields from the table: "coupon" */
  coupon_aggregate: Coupon_Aggregate;
  /** fetch data from the table: "coupon" using primary key columns */
  coupon_by_pk?: Maybe<Coupon>;
  /** fetch data from the table in a streaming manner: "coupon" */
  coupon_stream: Array<Coupon>;
  /** fetch data from the table: "coupon_using_history" */
  coupon_using_history: Array<Coupon_Using_History>;
  /** fetch aggregated fields from the table: "coupon_using_history" */
  coupon_using_history_aggregate: Coupon_Using_History_Aggregate;
  /** fetch data from the table: "coupon_using_history" using primary key columns */
  coupon_using_history_by_pk?: Maybe<Coupon_Using_History>;
  /** fetch data from the table in a streaming manner: "coupon_using_history" */
  coupon_using_history_stream: Array<Coupon_Using_History>;
  /** fetch data from the table: "invitation" */
  invitation: Array<Invitation>;
  /** fetch aggregated fields from the table: "invitation" */
  invitation_aggregate: Invitation_Aggregate;
  /** fetch data from the table: "invitation_attachment" */
  invitation_attachment: Array<Invitation_Attachment>;
  /** fetch aggregated fields from the table: "invitation_attachment" */
  invitation_attachment_aggregate: Invitation_Attachment_Aggregate;
  /** fetch data from the table: "invitation_attachment" using primary key columns */
  invitation_attachment_by_pk?: Maybe<Invitation_Attachment>;
  /** fetch data from the table in a streaming manner: "invitation_attachment" */
  invitation_attachment_stream: Array<Invitation_Attachment>;
  /** fetch data from the table: "invitation" using primary key columns */
  invitation_by_pk?: Maybe<Invitation>;
  /** fetch data from the table: "invitation_comment" */
  invitation_comment: Array<Invitation_Comment>;
  /** fetch aggregated fields from the table: "invitation_comment" */
  invitation_comment_aggregate: Invitation_Comment_Aggregate;
  /** fetch data from the table: "invitation_comment" using primary key columns */
  invitation_comment_by_pk?: Maybe<Invitation_Comment>;
  /** fetch data from the table in a streaming manner: "invitation_comment" */
  invitation_comment_stream: Array<Invitation_Comment>;
  /** fetch data from the table: "invitation_editor" */
  invitation_editor: Array<Invitation_Editor>;
  /** fetch aggregated fields from the table: "invitation_editor" */
  invitation_editor_aggregate: Invitation_Editor_Aggregate;
  /** fetch data from the table: "invitation_editor" using primary key columns */
  invitation_editor_by_pk?: Maybe<Invitation_Editor>;
  /** fetch data from the table in a streaming manner: "invitation_editor" */
  invitation_editor_stream: Array<Invitation_Editor>;
  /** fetch data from the table: "invitation_owner" */
  invitation_owner: Array<Invitation_Owner>;
  /** fetch aggregated fields from the table: "invitation_owner" */
  invitation_owner_aggregate: Invitation_Owner_Aggregate;
  /** fetch data from the table: "invitation_owner" using primary key columns */
  invitation_owner_by_pk?: Maybe<Invitation_Owner>;
  /** fetch data from the table in a streaming manner: "invitation_owner" */
  invitation_owner_stream: Array<Invitation_Owner>;
  /** fetch data from the table: "invitation_rsvp_answer" */
  invitation_rsvp_answer: Array<Invitation_Rsvp_Answer>;
  /** fetch aggregated fields from the table: "invitation_rsvp_answer" */
  invitation_rsvp_answer_aggregate: Invitation_Rsvp_Answer_Aggregate;
  /** fetch data from the table: "invitation_rsvp_answer" using primary key columns */
  invitation_rsvp_answer_by_pk?: Maybe<Invitation_Rsvp_Answer>;
  /** fetch data from the table in a streaming manner: "invitation_rsvp_answer" */
  invitation_rsvp_answer_stream: Array<Invitation_Rsvp_Answer>;
  /** fetch data from the table: "invitation_share" */
  invitation_share: Array<Invitation_Share>;
  /** fetch aggregated fields from the table: "invitation_share" */
  invitation_share_aggregate: Invitation_Share_Aggregate;
  /** fetch data from the table: "invitation_share" using primary key columns */
  invitation_share_by_pk?: Maybe<Invitation_Share>;
  /** fetch data from the table in a streaming manner: "invitation_share" */
  invitation_share_stream: Array<Invitation_Share>;
  /** fetch data from the table in a streaming manner: "invitation" */
  invitation_stream: Array<Invitation>;
  /** fetch data from the table: "invitation_visit_log" */
  invitation_visit_log: Array<Invitation_Visit_Log>;
  /** fetch aggregated fields from the table: "invitation_visit_log" */
  invitation_visit_log_aggregate: Invitation_Visit_Log_Aggregate;
  /** fetch data from the table: "invitation_visit_log" using primary key columns */
  invitation_visit_log_by_pk?: Maybe<Invitation_Visit_Log>;
  /** fetch data from the table in a streaming manner: "invitation_visit_log" */
  invitation_visit_log_stream: Array<Invitation_Visit_Log>;
  /** fetch data from the table: "order" */
  order: Array<Order>;
  /** fetch aggregated fields from the table: "order" */
  order_aggregate: Order_Aggregate;
  /** fetch data from the table: "order" using primary key columns */
  order_by_pk?: Maybe<Order>;
  /** fetch data from the table in a streaming manner: "order" */
  order_stream: Array<Order>;
  /** An array relationship */
  sms_verifications: Array<Sms_Verifications>;
  /** An aggregate relationship */
  sms_verifications_aggregate: Sms_Verifications_Aggregate;
  /** fetch data from the table: "sms_verifications" using primary key columns */
  sms_verifications_by_pk?: Maybe<Sms_Verifications>;
  /** fetch data from the table in a streaming manner: "sms_verifications" */
  sms_verifications_stream: Array<Sms_Verifications>;
  /** fetch data from the table: "template" */
  template: Array<Template>;
  /** fetch aggregated fields from the table: "template" */
  template_aggregate: Template_Aggregate;
  /** fetch data from the table: "template" using primary key columns */
  template_by_pk?: Maybe<Template>;
  /** fetch data from the table in a streaming manner: "template" */
  template_stream: Array<Template>;
  /** fetch data from the table: "user" */
  user: Array<User>;
  /** fetch aggregated fields from the table: "user" */
  user_aggregate: User_Aggregate;
  /** fetch data from the table: "user" using primary key columns */
  user_by_pk?: Maybe<User>;
  /** fetch data from the table in a streaming manner: "user" */
  user_stream: Array<User>;
  /** An array relationship */
  user_tokens: Array<User_Tokens>;
  /** An aggregate relationship */
  user_tokens_aggregate: User_Tokens_Aggregate;
  /** fetch data from the table: "user_tokens" using primary key columns */
  user_tokens_by_pk?: Maybe<User_Tokens>;
  /** fetch data from the table in a streaming manner: "user_tokens" */
  user_tokens_stream: Array<User_Tokens>;
  /** fetch data from the table: "widget" */
  widget: Array<Widget>;
  /** fetch aggregated fields from the table: "widget" */
  widget_aggregate: Widget_Aggregate;
  /** fetch data from the table: "widget" using primary key columns */
  widget_by_pk?: Maybe<Widget>;
  /** fetch data from the table: "widget_sticker" */
  widget_sticker: Array<Widget_Sticker>;
  /** fetch aggregated fields from the table: "widget_sticker" */
  widget_sticker_aggregate: Widget_Sticker_Aggregate;
  /** fetch data from the table: "widget_sticker" using primary key columns */
  widget_sticker_by_pk?: Maybe<Widget_Sticker>;
  /** fetch data from the table in a streaming manner: "widget_sticker" */
  widget_sticker_stream: Array<Widget_Sticker>;
  /** fetch data from the table in a streaming manner: "widget" */
  widget_stream: Array<Widget>;
};


export type Subscription_RootCouponArgs = {
  distinct_on?: InputMaybe<Array<Coupon_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Coupon_Order_By>>;
  where?: InputMaybe<Coupon_Bool_Exp>;
};


export type Subscription_RootCoupon_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Coupon_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Coupon_Order_By>>;
  where?: InputMaybe<Coupon_Bool_Exp>;
};


export type Subscription_RootCoupon_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootCoupon_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Coupon_Stream_Cursor_Input>>;
  where?: InputMaybe<Coupon_Bool_Exp>;
};


export type Subscription_RootCoupon_Using_HistoryArgs = {
  distinct_on?: InputMaybe<Array<Coupon_Using_History_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Coupon_Using_History_Order_By>>;
  where?: InputMaybe<Coupon_Using_History_Bool_Exp>;
};


export type Subscription_RootCoupon_Using_History_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Coupon_Using_History_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Coupon_Using_History_Order_By>>;
  where?: InputMaybe<Coupon_Using_History_Bool_Exp>;
};


export type Subscription_RootCoupon_Using_History_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootCoupon_Using_History_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Coupon_Using_History_Stream_Cursor_Input>>;
  where?: InputMaybe<Coupon_Using_History_Bool_Exp>;
};


export type Subscription_RootInvitationArgs = {
  distinct_on?: InputMaybe<Array<Invitation_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Invitation_Order_By>>;
  where?: InputMaybe<Invitation_Bool_Exp>;
};


export type Subscription_RootInvitation_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Invitation_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Invitation_Order_By>>;
  where?: InputMaybe<Invitation_Bool_Exp>;
};


export type Subscription_RootInvitation_AttachmentArgs = {
  distinct_on?: InputMaybe<Array<Invitation_Attachment_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Invitation_Attachment_Order_By>>;
  where?: InputMaybe<Invitation_Attachment_Bool_Exp>;
};


export type Subscription_RootInvitation_Attachment_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Invitation_Attachment_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Invitation_Attachment_Order_By>>;
  where?: InputMaybe<Invitation_Attachment_Bool_Exp>;
};


export type Subscription_RootInvitation_Attachment_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootInvitation_Attachment_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Invitation_Attachment_Stream_Cursor_Input>>;
  where?: InputMaybe<Invitation_Attachment_Bool_Exp>;
};


export type Subscription_RootInvitation_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootInvitation_CommentArgs = {
  distinct_on?: InputMaybe<Array<Invitation_Comment_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Invitation_Comment_Order_By>>;
  where?: InputMaybe<Invitation_Comment_Bool_Exp>;
};


export type Subscription_RootInvitation_Comment_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Invitation_Comment_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Invitation_Comment_Order_By>>;
  where?: InputMaybe<Invitation_Comment_Bool_Exp>;
};


export type Subscription_RootInvitation_Comment_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootInvitation_Comment_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Invitation_Comment_Stream_Cursor_Input>>;
  where?: InputMaybe<Invitation_Comment_Bool_Exp>;
};


export type Subscription_RootInvitation_EditorArgs = {
  distinct_on?: InputMaybe<Array<Invitation_Editor_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Invitation_Editor_Order_By>>;
  where?: InputMaybe<Invitation_Editor_Bool_Exp>;
};


export type Subscription_RootInvitation_Editor_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Invitation_Editor_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Invitation_Editor_Order_By>>;
  where?: InputMaybe<Invitation_Editor_Bool_Exp>;
};


export type Subscription_RootInvitation_Editor_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootInvitation_Editor_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Invitation_Editor_Stream_Cursor_Input>>;
  where?: InputMaybe<Invitation_Editor_Bool_Exp>;
};


export type Subscription_RootInvitation_OwnerArgs = {
  distinct_on?: InputMaybe<Array<Invitation_Owner_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Invitation_Owner_Order_By>>;
  where?: InputMaybe<Invitation_Owner_Bool_Exp>;
};


export type Subscription_RootInvitation_Owner_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Invitation_Owner_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Invitation_Owner_Order_By>>;
  where?: InputMaybe<Invitation_Owner_Bool_Exp>;
};


export type Subscription_RootInvitation_Owner_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootInvitation_Owner_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Invitation_Owner_Stream_Cursor_Input>>;
  where?: InputMaybe<Invitation_Owner_Bool_Exp>;
};


export type Subscription_RootInvitation_Rsvp_AnswerArgs = {
  distinct_on?: InputMaybe<Array<Invitation_Rsvp_Answer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Invitation_Rsvp_Answer_Order_By>>;
  where?: InputMaybe<Invitation_Rsvp_Answer_Bool_Exp>;
};


export type Subscription_RootInvitation_Rsvp_Answer_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Invitation_Rsvp_Answer_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Invitation_Rsvp_Answer_Order_By>>;
  where?: InputMaybe<Invitation_Rsvp_Answer_Bool_Exp>;
};


export type Subscription_RootInvitation_Rsvp_Answer_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootInvitation_Rsvp_Answer_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Invitation_Rsvp_Answer_Stream_Cursor_Input>>;
  where?: InputMaybe<Invitation_Rsvp_Answer_Bool_Exp>;
};


export type Subscription_RootInvitation_ShareArgs = {
  distinct_on?: InputMaybe<Array<Invitation_Share_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Invitation_Share_Order_By>>;
  where?: InputMaybe<Invitation_Share_Bool_Exp>;
};


export type Subscription_RootInvitation_Share_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Invitation_Share_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Invitation_Share_Order_By>>;
  where?: InputMaybe<Invitation_Share_Bool_Exp>;
};


export type Subscription_RootInvitation_Share_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootInvitation_Share_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Invitation_Share_Stream_Cursor_Input>>;
  where?: InputMaybe<Invitation_Share_Bool_Exp>;
};


export type Subscription_RootInvitation_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Invitation_Stream_Cursor_Input>>;
  where?: InputMaybe<Invitation_Bool_Exp>;
};


export type Subscription_RootInvitation_Visit_LogArgs = {
  distinct_on?: InputMaybe<Array<Invitation_Visit_Log_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Invitation_Visit_Log_Order_By>>;
  where?: InputMaybe<Invitation_Visit_Log_Bool_Exp>;
};


export type Subscription_RootInvitation_Visit_Log_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Invitation_Visit_Log_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Invitation_Visit_Log_Order_By>>;
  where?: InputMaybe<Invitation_Visit_Log_Bool_Exp>;
};


export type Subscription_RootInvitation_Visit_Log_By_PkArgs = {
  id: Scalars['bigint']['input'];
};


export type Subscription_RootInvitation_Visit_Log_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Invitation_Visit_Log_Stream_Cursor_Input>>;
  where?: InputMaybe<Invitation_Visit_Log_Bool_Exp>;
};


export type Subscription_RootOrderArgs = {
  distinct_on?: InputMaybe<Array<Order_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Order_Order_By>>;
  where?: InputMaybe<Order_Bool_Exp>;
};


export type Subscription_RootOrder_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Order_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Order_Order_By>>;
  where?: InputMaybe<Order_Bool_Exp>;
};


export type Subscription_RootOrder_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootOrder_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Order_Stream_Cursor_Input>>;
  where?: InputMaybe<Order_Bool_Exp>;
};


export type Subscription_RootSms_VerificationsArgs = {
  distinct_on?: InputMaybe<Array<Sms_Verifications_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Sms_Verifications_Order_By>>;
  where?: InputMaybe<Sms_Verifications_Bool_Exp>;
};


export type Subscription_RootSms_Verifications_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Sms_Verifications_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Sms_Verifications_Order_By>>;
  where?: InputMaybe<Sms_Verifications_Bool_Exp>;
};


export type Subscription_RootSms_Verifications_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootSms_Verifications_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Sms_Verifications_Stream_Cursor_Input>>;
  where?: InputMaybe<Sms_Verifications_Bool_Exp>;
};


export type Subscription_RootTemplateArgs = {
  distinct_on?: InputMaybe<Array<Template_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Template_Order_By>>;
  where?: InputMaybe<Template_Bool_Exp>;
};


export type Subscription_RootTemplate_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Template_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Template_Order_By>>;
  where?: InputMaybe<Template_Bool_Exp>;
};


export type Subscription_RootTemplate_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootTemplate_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Template_Stream_Cursor_Input>>;
  where?: InputMaybe<Template_Bool_Exp>;
};


export type Subscription_RootUserArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};


export type Subscription_RootUser_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};


export type Subscription_RootUser_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootUser_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<User_Stream_Cursor_Input>>;
  where?: InputMaybe<User_Bool_Exp>;
};


export type Subscription_RootUser_TokensArgs = {
  distinct_on?: InputMaybe<Array<User_Tokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Tokens_Order_By>>;
  where?: InputMaybe<User_Tokens_Bool_Exp>;
};


export type Subscription_RootUser_Tokens_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Tokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Tokens_Order_By>>;
  where?: InputMaybe<User_Tokens_Bool_Exp>;
};


export type Subscription_RootUser_Tokens_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootUser_Tokens_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<User_Tokens_Stream_Cursor_Input>>;
  where?: InputMaybe<User_Tokens_Bool_Exp>;
};


export type Subscription_RootWidgetArgs = {
  distinct_on?: InputMaybe<Array<Widget_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Widget_Order_By>>;
  where?: InputMaybe<Widget_Bool_Exp>;
};


export type Subscription_RootWidget_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Widget_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Widget_Order_By>>;
  where?: InputMaybe<Widget_Bool_Exp>;
};


export type Subscription_RootWidget_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootWidget_StickerArgs = {
  distinct_on?: InputMaybe<Array<Widget_Sticker_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Widget_Sticker_Order_By>>;
  where?: InputMaybe<Widget_Sticker_Bool_Exp>;
};


export type Subscription_RootWidget_Sticker_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Widget_Sticker_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Widget_Sticker_Order_By>>;
  where?: InputMaybe<Widget_Sticker_Bool_Exp>;
};


export type Subscription_RootWidget_Sticker_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootWidget_Sticker_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Widget_Sticker_Stream_Cursor_Input>>;
  where?: InputMaybe<Widget_Sticker_Bool_Exp>;
};


export type Subscription_RootWidget_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Widget_Stream_Cursor_Input>>;
  where?: InputMaybe<Widget_Bool_Exp>;
};

/** columns and relationships of "template" */
export type Template = {
  __typename?: 'template';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id: Scalars['uuid']['output'];
  /** An object relationship */
  invitation?: Maybe<Invitation>;
  invitation_id?: Maybe<Scalars['uuid']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregated selection of "template" */
export type Template_Aggregate = {
  __typename?: 'template_aggregate';
  aggregate?: Maybe<Template_Aggregate_Fields>;
  nodes: Array<Template>;
};

export type Template_Aggregate_Bool_Exp = {
  count?: InputMaybe<Template_Aggregate_Bool_Exp_Count>;
};

export type Template_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Template_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Template_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "template" */
export type Template_Aggregate_Fields = {
  __typename?: 'template_aggregate_fields';
  avg?: Maybe<Template_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Template_Max_Fields>;
  min?: Maybe<Template_Min_Fields>;
  stddev?: Maybe<Template_Stddev_Fields>;
  stddev_pop?: Maybe<Template_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Template_Stddev_Samp_Fields>;
  sum?: Maybe<Template_Sum_Fields>;
  var_pop?: Maybe<Template_Var_Pop_Fields>;
  var_samp?: Maybe<Template_Var_Samp_Fields>;
  variance?: Maybe<Template_Variance_Fields>;
};


/** aggregate fields of "template" */
export type Template_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Template_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "template" */
export type Template_Aggregate_Order_By = {
  avg?: InputMaybe<Template_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Template_Max_Order_By>;
  min?: InputMaybe<Template_Min_Order_By>;
  stddev?: InputMaybe<Template_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Template_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Template_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Template_Sum_Order_By>;
  var_pop?: InputMaybe<Template_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Template_Var_Samp_Order_By>;
  variance?: InputMaybe<Template_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "template" */
export type Template_Arr_Rel_Insert_Input = {
  data: Array<Template_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Template_On_Conflict>;
};

/** aggregate avg on columns */
export type Template_Avg_Fields = {
  __typename?: 'template_avg_fields';
  order?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "template" */
export type Template_Avg_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "template". All fields are combined with a logical 'AND'. */
export type Template_Bool_Exp = {
  _and?: InputMaybe<Array<Template_Bool_Exp>>;
  _not?: InputMaybe<Template_Bool_Exp>;
  _or?: InputMaybe<Array<Template_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  invitation?: InputMaybe<Invitation_Bool_Exp>;
  invitation_id?: InputMaybe<Uuid_Comparison_Exp>;
  order?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "template" */
export enum Template_Constraint {
  /** unique or primary key constraint on columns "id" */
  TemplatePkey = 'template_pkey'
}

/** input type for incrementing numeric columns in table "template" */
export type Template_Inc_Input = {
  order?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "template" */
export type Template_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  invitation?: InputMaybe<Invitation_Obj_Rel_Insert_Input>;
  invitation_id?: InputMaybe<Scalars['uuid']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate max on columns */
export type Template_Max_Fields = {
  __typename?: 'template_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  invitation_id?: Maybe<Scalars['uuid']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "template" */
export type Template_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  invitation_id?: InputMaybe<Order_By>;
  order?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Template_Min_Fields = {
  __typename?: 'template_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  invitation_id?: Maybe<Scalars['uuid']['output']>;
  order?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "template" */
export type Template_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  invitation_id?: InputMaybe<Order_By>;
  order?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "template" */
export type Template_Mutation_Response = {
  __typename?: 'template_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Template>;
};

/** on_conflict condition type for table "template" */
export type Template_On_Conflict = {
  constraint: Template_Constraint;
  update_columns?: Array<Template_Update_Column>;
  where?: InputMaybe<Template_Bool_Exp>;
};

/** Ordering options when selecting data from "template". */
export type Template_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  invitation?: InputMaybe<Invitation_Order_By>;
  invitation_id?: InputMaybe<Order_By>;
  order?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: template */
export type Template_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "template" */
export enum Template_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  InvitationId = 'invitation_id',
  /** column name */
  Order = 'order',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "template" */
export type Template_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  invitation_id?: InputMaybe<Scalars['uuid']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate stddev on columns */
export type Template_Stddev_Fields = {
  __typename?: 'template_stddev_fields';
  order?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "template" */
export type Template_Stddev_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Template_Stddev_Pop_Fields = {
  __typename?: 'template_stddev_pop_fields';
  order?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "template" */
export type Template_Stddev_Pop_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Template_Stddev_Samp_Fields = {
  __typename?: 'template_stddev_samp_fields';
  order?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "template" */
export type Template_Stddev_Samp_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "template" */
export type Template_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Template_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Template_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  invitation_id?: InputMaybe<Scalars['uuid']['input']>;
  order?: InputMaybe<Scalars['Int']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate sum on columns */
export type Template_Sum_Fields = {
  __typename?: 'template_sum_fields';
  order?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "template" */
export type Template_Sum_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** update columns of table "template" */
export enum Template_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  InvitationId = 'invitation_id',
  /** column name */
  Order = 'order',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Template_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Template_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Template_Set_Input>;
  /** filter the rows which have to be updated */
  where: Template_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Template_Var_Pop_Fields = {
  __typename?: 'template_var_pop_fields';
  order?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "template" */
export type Template_Var_Pop_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Template_Var_Samp_Fields = {
  __typename?: 'template_var_samp_fields';
  order?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "template" */
export type Template_Var_Samp_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Template_Variance_Fields = {
  __typename?: 'template_variance_fields';
  order?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "template" */
export type Template_Variance_Order_By = {
  order?: InputMaybe<Order_By>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']['input']>;
  _gt?: InputMaybe<Scalars['timestamptz']['input']>;
  _gte?: InputMaybe<Scalars['timestamptz']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamptz']['input']>;
  _lte?: InputMaybe<Scalars['timestamptz']['input']>;
  _neq?: InputMaybe<Scalars['timestamptz']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']['input']>>;
};

/** columns and relationships of "user" */
export type User = {
  __typename?: 'user';
  accept_marketing?: Maybe<Scalars['Boolean']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['uuid']['output'];
  /** An array relationship */
  invitation_attachments: Array<Invitation_Attachment>;
  /** An aggregate relationship */
  invitation_attachments_aggregate: Invitation_Attachment_Aggregate;
  /** An array relationship */
  invitation_editors: Array<Invitation_Editor>;
  /** An aggregate relationship */
  invitation_editors_aggregate: Invitation_Editor_Aggregate;
  is_admin?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  profile_image?: Maybe<Scalars['String']['output']>;
  provider?: Maybe<Scalars['String']['output']>;
  provider_id?: Maybe<Scalars['String']['output']>;
  removed_at?: Maybe<Scalars['timestamptz']['output']>;
  /** An array relationship */
  sms_verifications: Array<Sms_Verifications>;
  /** An aggregate relationship */
  sms_verifications_aggregate: Sms_Verifications_Aggregate;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  /** An array relationship */
  user_tokens: Array<User_Tokens>;
  /** An aggregate relationship */
  user_tokens_aggregate: User_Tokens_Aggregate;
};


/** columns and relationships of "user" */
export type UserInvitation_AttachmentsArgs = {
  distinct_on?: InputMaybe<Array<Invitation_Attachment_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Invitation_Attachment_Order_By>>;
  where?: InputMaybe<Invitation_Attachment_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserInvitation_Attachments_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Invitation_Attachment_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Invitation_Attachment_Order_By>>;
  where?: InputMaybe<Invitation_Attachment_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserInvitation_EditorsArgs = {
  distinct_on?: InputMaybe<Array<Invitation_Editor_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Invitation_Editor_Order_By>>;
  where?: InputMaybe<Invitation_Editor_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserInvitation_Editors_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Invitation_Editor_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Invitation_Editor_Order_By>>;
  where?: InputMaybe<Invitation_Editor_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserSms_VerificationsArgs = {
  distinct_on?: InputMaybe<Array<Sms_Verifications_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Sms_Verifications_Order_By>>;
  where?: InputMaybe<Sms_Verifications_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserSms_Verifications_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Sms_Verifications_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Sms_Verifications_Order_By>>;
  where?: InputMaybe<Sms_Verifications_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserUser_TokensArgs = {
  distinct_on?: InputMaybe<Array<User_Tokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Tokens_Order_By>>;
  where?: InputMaybe<User_Tokens_Bool_Exp>;
};


/** columns and relationships of "user" */
export type UserUser_Tokens_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Tokens_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Tokens_Order_By>>;
  where?: InputMaybe<User_Tokens_Bool_Exp>;
};

/** aggregated selection of "user" */
export type User_Aggregate = {
  __typename?: 'user_aggregate';
  aggregate?: Maybe<User_Aggregate_Fields>;
  nodes: Array<User>;
};

/** aggregate fields of "user" */
export type User_Aggregate_Fields = {
  __typename?: 'user_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<User_Max_Fields>;
  min?: Maybe<User_Min_Fields>;
};


/** aggregate fields of "user" */
export type User_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<User_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "user". All fields are combined with a logical 'AND'. */
export type User_Bool_Exp = {
  _and?: InputMaybe<Array<User_Bool_Exp>>;
  _not?: InputMaybe<User_Bool_Exp>;
  _or?: InputMaybe<Array<User_Bool_Exp>>;
  accept_marketing?: InputMaybe<Boolean_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  email?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  invitation_attachments?: InputMaybe<Invitation_Attachment_Bool_Exp>;
  invitation_attachments_aggregate?: InputMaybe<Invitation_Attachment_Aggregate_Bool_Exp>;
  invitation_editors?: InputMaybe<Invitation_Editor_Bool_Exp>;
  invitation_editors_aggregate?: InputMaybe<Invitation_Editor_Aggregate_Bool_Exp>;
  is_admin?: InputMaybe<Boolean_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  profile_image?: InputMaybe<String_Comparison_Exp>;
  provider?: InputMaybe<String_Comparison_Exp>;
  provider_id?: InputMaybe<String_Comparison_Exp>;
  removed_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  sms_verifications?: InputMaybe<Sms_Verifications_Bool_Exp>;
  sms_verifications_aggregate?: InputMaybe<Sms_Verifications_Aggregate_Bool_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user_tokens?: InputMaybe<User_Tokens_Bool_Exp>;
  user_tokens_aggregate?: InputMaybe<User_Tokens_Aggregate_Bool_Exp>;
};

/** unique or primary key constraints on table "user" */
export enum User_Constraint {
  /** unique or primary key constraint on columns "id" */
  UserPkey = 'user_pkey',
  /** unique or primary key constraint on columns "provider", "provider_id" */
  UserProviderIdx = 'user_provider_idx'
}

/** input type for inserting data into table "user" */
export type User_Insert_Input = {
  accept_marketing?: InputMaybe<Scalars['Boolean']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  invitation_attachments?: InputMaybe<Invitation_Attachment_Arr_Rel_Insert_Input>;
  invitation_editors?: InputMaybe<Invitation_Editor_Arr_Rel_Insert_Input>;
  is_admin?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  profile_image?: InputMaybe<Scalars['String']['input']>;
  provider?: InputMaybe<Scalars['String']['input']>;
  provider_id?: InputMaybe<Scalars['String']['input']>;
  removed_at?: InputMaybe<Scalars['timestamptz']['input']>;
  sms_verifications?: InputMaybe<Sms_Verifications_Arr_Rel_Insert_Input>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_tokens?: InputMaybe<User_Tokens_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type User_Max_Fields = {
  __typename?: 'user_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  profile_image?: Maybe<Scalars['String']['output']>;
  provider?: Maybe<Scalars['String']['output']>;
  provider_id?: Maybe<Scalars['String']['output']>;
  removed_at?: Maybe<Scalars['timestamptz']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** aggregate min on columns */
export type User_Min_Fields = {
  __typename?: 'user_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  profile_image?: Maybe<Scalars['String']['output']>;
  provider?: Maybe<Scalars['String']['output']>;
  provider_id?: Maybe<Scalars['String']['output']>;
  removed_at?: Maybe<Scalars['timestamptz']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** response of any mutation on the table "user" */
export type User_Mutation_Response = {
  __typename?: 'user_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<User>;
};

/** input type for inserting object relation for remote table "user" */
export type User_Obj_Rel_Insert_Input = {
  data: User_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<User_On_Conflict>;
};

/** on_conflict condition type for table "user" */
export type User_On_Conflict = {
  constraint: User_Constraint;
  update_columns?: Array<User_Update_Column>;
  where?: InputMaybe<User_Bool_Exp>;
};

/** Ordering options when selecting data from "user". */
export type User_Order_By = {
  accept_marketing?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  invitation_attachments_aggregate?: InputMaybe<Invitation_Attachment_Aggregate_Order_By>;
  invitation_editors_aggregate?: InputMaybe<Invitation_Editor_Aggregate_Order_By>;
  is_admin?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  profile_image?: InputMaybe<Order_By>;
  provider?: InputMaybe<Order_By>;
  provider_id?: InputMaybe<Order_By>;
  removed_at?: InputMaybe<Order_By>;
  sms_verifications_aggregate?: InputMaybe<Sms_Verifications_Aggregate_Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_tokens_aggregate?: InputMaybe<User_Tokens_Aggregate_Order_By>;
};

/** primary key columns input for table: user */
export type User_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "user" */
export enum User_Select_Column {
  /** column name */
  AcceptMarketing = 'accept_marketing',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  IsAdmin = 'is_admin',
  /** column name */
  Name = 'name',
  /** column name */
  ProfileImage = 'profile_image',
  /** column name */
  Provider = 'provider',
  /** column name */
  ProviderId = 'provider_id',
  /** column name */
  RemovedAt = 'removed_at',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "user" */
export type User_Set_Input = {
  accept_marketing?: InputMaybe<Scalars['Boolean']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  is_admin?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  profile_image?: InputMaybe<Scalars['String']['input']>;
  provider?: InputMaybe<Scalars['String']['input']>;
  provider_id?: InputMaybe<Scalars['String']['input']>;
  removed_at?: InputMaybe<Scalars['timestamptz']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** Streaming cursor of the table "user" */
export type User_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: User_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type User_Stream_Cursor_Value_Input = {
  accept_marketing?: InputMaybe<Scalars['Boolean']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  is_admin?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  profile_image?: InputMaybe<Scalars['String']['input']>;
  provider?: InputMaybe<Scalars['String']['input']>;
  provider_id?: InputMaybe<Scalars['String']['input']>;
  removed_at?: InputMaybe<Scalars['timestamptz']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** columns and relationships of "user_tokens" */
export type User_Tokens = {
  __typename?: 'user_tokens';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id: Scalars['uuid']['output'];
  ip_address?: Maybe<Scalars['inet']['output']>;
  last_used_at?: Maybe<Scalars['timestamptz']['output']>;
  provider: Scalars['String']['output'];
  refresh_token: Scalars['String']['output'];
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  /** An object relationship */
  user: User;
  user_agent?: Maybe<Scalars['String']['output']>;
  user_id: Scalars['uuid']['output'];
};

/** aggregated selection of "user_tokens" */
export type User_Tokens_Aggregate = {
  __typename?: 'user_tokens_aggregate';
  aggregate?: Maybe<User_Tokens_Aggregate_Fields>;
  nodes: Array<User_Tokens>;
};

export type User_Tokens_Aggregate_Bool_Exp = {
  count?: InputMaybe<User_Tokens_Aggregate_Bool_Exp_Count>;
};

export type User_Tokens_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<User_Tokens_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<User_Tokens_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "user_tokens" */
export type User_Tokens_Aggregate_Fields = {
  __typename?: 'user_tokens_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<User_Tokens_Max_Fields>;
  min?: Maybe<User_Tokens_Min_Fields>;
};


/** aggregate fields of "user_tokens" */
export type User_Tokens_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<User_Tokens_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "user_tokens" */
export type User_Tokens_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<User_Tokens_Max_Order_By>;
  min?: InputMaybe<User_Tokens_Min_Order_By>;
};

/** input type for inserting array relation for remote table "user_tokens" */
export type User_Tokens_Arr_Rel_Insert_Input = {
  data: Array<User_Tokens_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<User_Tokens_On_Conflict>;
};

/** Boolean expression to filter rows from the table "user_tokens". All fields are combined with a logical 'AND'. */
export type User_Tokens_Bool_Exp = {
  _and?: InputMaybe<Array<User_Tokens_Bool_Exp>>;
  _not?: InputMaybe<User_Tokens_Bool_Exp>;
  _or?: InputMaybe<Array<User_Tokens_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  ip_address?: InputMaybe<Inet_Comparison_Exp>;
  last_used_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  provider?: InputMaybe<String_Comparison_Exp>;
  refresh_token?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<User_Bool_Exp>;
  user_agent?: InputMaybe<String_Comparison_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "user_tokens" */
export enum User_Tokens_Constraint {
  /** unique or primary key constraint on columns "id" */
  UserTokensPkey = 'user_tokens_pkey'
}

/** input type for inserting data into table "user_tokens" */
export type User_Tokens_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  ip_address?: InputMaybe<Scalars['inet']['input']>;
  last_used_at?: InputMaybe<Scalars['timestamptz']['input']>;
  provider?: InputMaybe<Scalars['String']['input']>;
  refresh_token?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user?: InputMaybe<User_Obj_Rel_Insert_Input>;
  user_agent?: InputMaybe<Scalars['String']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type User_Tokens_Max_Fields = {
  __typename?: 'user_tokens_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  last_used_at?: Maybe<Scalars['timestamptz']['output']>;
  provider?: Maybe<Scalars['String']['output']>;
  refresh_token?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_agent?: Maybe<Scalars['String']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "user_tokens" */
export type User_Tokens_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_used_at?: InputMaybe<Order_By>;
  provider?: InputMaybe<Order_By>;
  refresh_token?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_agent?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type User_Tokens_Min_Fields = {
  __typename?: 'user_tokens_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  last_used_at?: Maybe<Scalars['timestamptz']['output']>;
  provider?: Maybe<Scalars['String']['output']>;
  refresh_token?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  user_agent?: Maybe<Scalars['String']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "user_tokens" */
export type User_Tokens_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_used_at?: InputMaybe<Order_By>;
  provider?: InputMaybe<Order_By>;
  refresh_token?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_agent?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "user_tokens" */
export type User_Tokens_Mutation_Response = {
  __typename?: 'user_tokens_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<User_Tokens>;
};

/** on_conflict condition type for table "user_tokens" */
export type User_Tokens_On_Conflict = {
  constraint: User_Tokens_Constraint;
  update_columns?: Array<User_Tokens_Update_Column>;
  where?: InputMaybe<User_Tokens_Bool_Exp>;
};

/** Ordering options when selecting data from "user_tokens". */
export type User_Tokens_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  ip_address?: InputMaybe<Order_By>;
  last_used_at?: InputMaybe<Order_By>;
  provider?: InputMaybe<Order_By>;
  refresh_token?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<User_Order_By>;
  user_agent?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: user_tokens */
export type User_Tokens_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "user_tokens" */
export enum User_Tokens_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  IpAddress = 'ip_address',
  /** column name */
  LastUsedAt = 'last_used_at',
  /** column name */
  Provider = 'provider',
  /** column name */
  RefreshToken = 'refresh_token',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserAgent = 'user_agent',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "user_tokens" */
export type User_Tokens_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  ip_address?: InputMaybe<Scalars['inet']['input']>;
  last_used_at?: InputMaybe<Scalars['timestamptz']['input']>;
  provider?: InputMaybe<Scalars['String']['input']>;
  refresh_token?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_agent?: InputMaybe<Scalars['String']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "user_tokens" */
export type User_Tokens_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: User_Tokens_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type User_Tokens_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  ip_address?: InputMaybe<Scalars['inet']['input']>;
  last_used_at?: InputMaybe<Scalars['timestamptz']['input']>;
  provider?: InputMaybe<Scalars['String']['input']>;
  refresh_token?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  user_agent?: InputMaybe<Scalars['String']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "user_tokens" */
export enum User_Tokens_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  IpAddress = 'ip_address',
  /** column name */
  LastUsedAt = 'last_used_at',
  /** column name */
  Provider = 'provider',
  /** column name */
  RefreshToken = 'refresh_token',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserAgent = 'user_agent',
  /** column name */
  UserId = 'user_id'
}

export type User_Tokens_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<User_Tokens_Set_Input>;
  /** filter the rows which have to be updated */
  where: User_Tokens_Bool_Exp;
};

/** update columns of table "user" */
export enum User_Update_Column {
  /** column name */
  AcceptMarketing = 'accept_marketing',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  IsAdmin = 'is_admin',
  /** column name */
  Name = 'name',
  /** column name */
  ProfileImage = 'profile_image',
  /** column name */
  Provider = 'provider',
  /** column name */
  ProviderId = 'provider_id',
  /** column name */
  RemovedAt = 'removed_at',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type User_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<User_Set_Input>;
  /** filter the rows which have to be updated */
  where: User_Bool_Exp;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['uuid']['input']>;
  _gt?: InputMaybe<Scalars['uuid']['input']>;
  _gte?: InputMaybe<Scalars['uuid']['input']>;
  _in?: InputMaybe<Array<Scalars['uuid']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['uuid']['input']>;
  _lte?: InputMaybe<Scalars['uuid']['input']>;
  _neq?: InputMaybe<Scalars['uuid']['input']>;
  _nin?: InputMaybe<Array<Scalars['uuid']['input']>>;
};

/** columns and relationships of "widget" */
export type Widget = {
  __typename?: 'widget';
  config?: Maybe<Scalars['jsonb']['output']>;
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id: Scalars['uuid']['output'];
  index?: Maybe<Scalars['Int']['output']>;
  /** An object relationship */
  invitation?: Maybe<Invitation>;
  /** An array relationship */
  invitation_attachments: Array<Invitation_Attachment>;
  /** An aggregate relationship */
  invitation_attachments_aggregate: Invitation_Attachment_Aggregate;
  invitation_id?: Maybe<Scalars['uuid']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  /** An array relationship */
  widget_stickers: Array<Widget_Sticker>;
  /** An aggregate relationship */
  widget_stickers_aggregate: Widget_Sticker_Aggregate;
};


/** columns and relationships of "widget" */
export type WidgetConfigArgs = {
  path?: InputMaybe<Scalars['String']['input']>;
};


/** columns and relationships of "widget" */
export type WidgetInvitation_AttachmentsArgs = {
  distinct_on?: InputMaybe<Array<Invitation_Attachment_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Invitation_Attachment_Order_By>>;
  where?: InputMaybe<Invitation_Attachment_Bool_Exp>;
};


/** columns and relationships of "widget" */
export type WidgetInvitation_Attachments_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Invitation_Attachment_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Invitation_Attachment_Order_By>>;
  where?: InputMaybe<Invitation_Attachment_Bool_Exp>;
};


/** columns and relationships of "widget" */
export type WidgetWidget_StickersArgs = {
  distinct_on?: InputMaybe<Array<Widget_Sticker_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Widget_Sticker_Order_By>>;
  where?: InputMaybe<Widget_Sticker_Bool_Exp>;
};


/** columns and relationships of "widget" */
export type WidgetWidget_Stickers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Widget_Sticker_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Widget_Sticker_Order_By>>;
  where?: InputMaybe<Widget_Sticker_Bool_Exp>;
};

/** aggregated selection of "widget" */
export type Widget_Aggregate = {
  __typename?: 'widget_aggregate';
  aggregate?: Maybe<Widget_Aggregate_Fields>;
  nodes: Array<Widget>;
};

export type Widget_Aggregate_Bool_Exp = {
  count?: InputMaybe<Widget_Aggregate_Bool_Exp_Count>;
};

export type Widget_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Widget_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Widget_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "widget" */
export type Widget_Aggregate_Fields = {
  __typename?: 'widget_aggregate_fields';
  avg?: Maybe<Widget_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Widget_Max_Fields>;
  min?: Maybe<Widget_Min_Fields>;
  stddev?: Maybe<Widget_Stddev_Fields>;
  stddev_pop?: Maybe<Widget_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Widget_Stddev_Samp_Fields>;
  sum?: Maybe<Widget_Sum_Fields>;
  var_pop?: Maybe<Widget_Var_Pop_Fields>;
  var_samp?: Maybe<Widget_Var_Samp_Fields>;
  variance?: Maybe<Widget_Variance_Fields>;
};


/** aggregate fields of "widget" */
export type Widget_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Widget_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "widget" */
export type Widget_Aggregate_Order_By = {
  avg?: InputMaybe<Widget_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Widget_Max_Order_By>;
  min?: InputMaybe<Widget_Min_Order_By>;
  stddev?: InputMaybe<Widget_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Widget_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Widget_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Widget_Sum_Order_By>;
  var_pop?: InputMaybe<Widget_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Widget_Var_Samp_Order_By>;
  variance?: InputMaybe<Widget_Variance_Order_By>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type Widget_Append_Input = {
  config?: InputMaybe<Scalars['jsonb']['input']>;
};

/** input type for inserting array relation for remote table "widget" */
export type Widget_Arr_Rel_Insert_Input = {
  data: Array<Widget_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Widget_On_Conflict>;
};

/** aggregate avg on columns */
export type Widget_Avg_Fields = {
  __typename?: 'widget_avg_fields';
  index?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "widget" */
export type Widget_Avg_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "widget". All fields are combined with a logical 'AND'. */
export type Widget_Bool_Exp = {
  _and?: InputMaybe<Array<Widget_Bool_Exp>>;
  _not?: InputMaybe<Widget_Bool_Exp>;
  _or?: InputMaybe<Array<Widget_Bool_Exp>>;
  config?: InputMaybe<Jsonb_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  index?: InputMaybe<Int_Comparison_Exp>;
  invitation?: InputMaybe<Invitation_Bool_Exp>;
  invitation_attachments?: InputMaybe<Invitation_Attachment_Bool_Exp>;
  invitation_attachments_aggregate?: InputMaybe<Invitation_Attachment_Aggregate_Bool_Exp>;
  invitation_id?: InputMaybe<Uuid_Comparison_Exp>;
  type?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  widget_stickers?: InputMaybe<Widget_Sticker_Bool_Exp>;
  widget_stickers_aggregate?: InputMaybe<Widget_Sticker_Aggregate_Bool_Exp>;
};

/** unique or primary key constraints on table "widget" */
export enum Widget_Constraint {
  /** unique or primary key constraint on columns "id" */
  WidgetPkey = 'widget_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type Widget_Delete_At_Path_Input = {
  config?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type Widget_Delete_Elem_Input = {
  config?: InputMaybe<Scalars['Int']['input']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type Widget_Delete_Key_Input = {
  config?: InputMaybe<Scalars['String']['input']>;
};

/** input type for incrementing numeric columns in table "widget" */
export type Widget_Inc_Input = {
  index?: InputMaybe<Scalars['Int']['input']>;
};

/** input type for inserting data into table "widget" */
export type Widget_Insert_Input = {
  config?: InputMaybe<Scalars['jsonb']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  index?: InputMaybe<Scalars['Int']['input']>;
  invitation?: InputMaybe<Invitation_Obj_Rel_Insert_Input>;
  invitation_attachments?: InputMaybe<Invitation_Attachment_Arr_Rel_Insert_Input>;
  invitation_id?: InputMaybe<Scalars['uuid']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  widget_stickers?: InputMaybe<Widget_Sticker_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Widget_Max_Fields = {
  __typename?: 'widget_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  index?: Maybe<Scalars['Int']['output']>;
  invitation_id?: Maybe<Scalars['uuid']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by max() on columns of table "widget" */
export type Widget_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  index?: InputMaybe<Order_By>;
  invitation_id?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Widget_Min_Fields = {
  __typename?: 'widget_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  index?: Maybe<Scalars['Int']['output']>;
  invitation_id?: Maybe<Scalars['uuid']['output']>;
  type?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
};

/** order by min() on columns of table "widget" */
export type Widget_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  index?: InputMaybe<Order_By>;
  invitation_id?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "widget" */
export type Widget_Mutation_Response = {
  __typename?: 'widget_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Widget>;
};

/** input type for inserting object relation for remote table "widget" */
export type Widget_Obj_Rel_Insert_Input = {
  data: Widget_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Widget_On_Conflict>;
};

/** on_conflict condition type for table "widget" */
export type Widget_On_Conflict = {
  constraint: Widget_Constraint;
  update_columns?: Array<Widget_Update_Column>;
  where?: InputMaybe<Widget_Bool_Exp>;
};

/** Ordering options when selecting data from "widget". */
export type Widget_Order_By = {
  config?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  index?: InputMaybe<Order_By>;
  invitation?: InputMaybe<Invitation_Order_By>;
  invitation_attachments_aggregate?: InputMaybe<Invitation_Attachment_Aggregate_Order_By>;
  invitation_id?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  widget_stickers_aggregate?: InputMaybe<Widget_Sticker_Aggregate_Order_By>;
};

/** primary key columns input for table: widget */
export type Widget_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type Widget_Prepend_Input = {
  config?: InputMaybe<Scalars['jsonb']['input']>;
};

/** select columns of table "widget" */
export enum Widget_Select_Column {
  /** column name */
  Config = 'config',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Index = 'index',
  /** column name */
  InvitationId = 'invitation_id',
  /** column name */
  Type = 'type',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "widget" */
export type Widget_Set_Input = {
  config?: InputMaybe<Scalars['jsonb']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  index?: InputMaybe<Scalars['Int']['input']>;
  invitation_id?: InputMaybe<Scalars['uuid']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate stddev on columns */
export type Widget_Stddev_Fields = {
  __typename?: 'widget_stddev_fields';
  index?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "widget" */
export type Widget_Stddev_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Widget_Stddev_Pop_Fields = {
  __typename?: 'widget_stddev_pop_fields';
  index?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "widget" */
export type Widget_Stddev_Pop_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Widget_Stddev_Samp_Fields = {
  __typename?: 'widget_stddev_samp_fields';
  index?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "widget" */
export type Widget_Stddev_Samp_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** columns and relationships of "widget_sticker" */
export type Widget_Sticker = {
  __typename?: 'widget_sticker';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id: Scalars['uuid']['output'];
  image_id?: Maybe<Scalars['String']['output']>;
  left?: Maybe<Scalars['numeric']['output']>;
  top?: Maybe<Scalars['numeric']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  /** An object relationship */
  widget?: Maybe<Widget>;
  widget_id?: Maybe<Scalars['uuid']['output']>;
  width?: Maybe<Scalars['numeric']['output']>;
};

/** aggregated selection of "widget_sticker" */
export type Widget_Sticker_Aggregate = {
  __typename?: 'widget_sticker_aggregate';
  aggregate?: Maybe<Widget_Sticker_Aggregate_Fields>;
  nodes: Array<Widget_Sticker>;
};

export type Widget_Sticker_Aggregate_Bool_Exp = {
  count?: InputMaybe<Widget_Sticker_Aggregate_Bool_Exp_Count>;
};

export type Widget_Sticker_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Widget_Sticker_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Widget_Sticker_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "widget_sticker" */
export type Widget_Sticker_Aggregate_Fields = {
  __typename?: 'widget_sticker_aggregate_fields';
  avg?: Maybe<Widget_Sticker_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Widget_Sticker_Max_Fields>;
  min?: Maybe<Widget_Sticker_Min_Fields>;
  stddev?: Maybe<Widget_Sticker_Stddev_Fields>;
  stddev_pop?: Maybe<Widget_Sticker_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Widget_Sticker_Stddev_Samp_Fields>;
  sum?: Maybe<Widget_Sticker_Sum_Fields>;
  var_pop?: Maybe<Widget_Sticker_Var_Pop_Fields>;
  var_samp?: Maybe<Widget_Sticker_Var_Samp_Fields>;
  variance?: Maybe<Widget_Sticker_Variance_Fields>;
};


/** aggregate fields of "widget_sticker" */
export type Widget_Sticker_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Widget_Sticker_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "widget_sticker" */
export type Widget_Sticker_Aggregate_Order_By = {
  avg?: InputMaybe<Widget_Sticker_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Widget_Sticker_Max_Order_By>;
  min?: InputMaybe<Widget_Sticker_Min_Order_By>;
  stddev?: InputMaybe<Widget_Sticker_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Widget_Sticker_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Widget_Sticker_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Widget_Sticker_Sum_Order_By>;
  var_pop?: InputMaybe<Widget_Sticker_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Widget_Sticker_Var_Samp_Order_By>;
  variance?: InputMaybe<Widget_Sticker_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "widget_sticker" */
export type Widget_Sticker_Arr_Rel_Insert_Input = {
  data: Array<Widget_Sticker_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Widget_Sticker_On_Conflict>;
};

/** aggregate avg on columns */
export type Widget_Sticker_Avg_Fields = {
  __typename?: 'widget_sticker_avg_fields';
  left?: Maybe<Scalars['Float']['output']>;
  top?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "widget_sticker" */
export type Widget_Sticker_Avg_Order_By = {
  left?: InputMaybe<Order_By>;
  top?: InputMaybe<Order_By>;
  width?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "widget_sticker". All fields are combined with a logical 'AND'. */
export type Widget_Sticker_Bool_Exp = {
  _and?: InputMaybe<Array<Widget_Sticker_Bool_Exp>>;
  _not?: InputMaybe<Widget_Sticker_Bool_Exp>;
  _or?: InputMaybe<Array<Widget_Sticker_Bool_Exp>>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  image_id?: InputMaybe<String_Comparison_Exp>;
  left?: InputMaybe<Numeric_Comparison_Exp>;
  top?: InputMaybe<Numeric_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  widget?: InputMaybe<Widget_Bool_Exp>;
  widget_id?: InputMaybe<Uuid_Comparison_Exp>;
  width?: InputMaybe<Numeric_Comparison_Exp>;
};

/** unique or primary key constraints on table "widget_sticker" */
export enum Widget_Sticker_Constraint {
  /** unique or primary key constraint on columns "id" */
  WidgetStickerPkey = 'widget_sticker_pkey'
}

/** input type for incrementing numeric columns in table "widget_sticker" */
export type Widget_Sticker_Inc_Input = {
  left?: InputMaybe<Scalars['numeric']['input']>;
  top?: InputMaybe<Scalars['numeric']['input']>;
  width?: InputMaybe<Scalars['numeric']['input']>;
};

/** input type for inserting data into table "widget_sticker" */
export type Widget_Sticker_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  image_id?: InputMaybe<Scalars['String']['input']>;
  left?: InputMaybe<Scalars['numeric']['input']>;
  top?: InputMaybe<Scalars['numeric']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  widget?: InputMaybe<Widget_Obj_Rel_Insert_Input>;
  widget_id?: InputMaybe<Scalars['uuid']['input']>;
  width?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate max on columns */
export type Widget_Sticker_Max_Fields = {
  __typename?: 'widget_sticker_max_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  image_id?: Maybe<Scalars['String']['output']>;
  left?: Maybe<Scalars['numeric']['output']>;
  top?: Maybe<Scalars['numeric']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  widget_id?: Maybe<Scalars['uuid']['output']>;
  width?: Maybe<Scalars['numeric']['output']>;
};

/** order by max() on columns of table "widget_sticker" */
export type Widget_Sticker_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image_id?: InputMaybe<Order_By>;
  left?: InputMaybe<Order_By>;
  top?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  widget_id?: InputMaybe<Order_By>;
  width?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Widget_Sticker_Min_Fields = {
  __typename?: 'widget_sticker_min_fields';
  created_at?: Maybe<Scalars['timestamptz']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  image_id?: Maybe<Scalars['String']['output']>;
  left?: Maybe<Scalars['numeric']['output']>;
  top?: Maybe<Scalars['numeric']['output']>;
  updated_at?: Maybe<Scalars['timestamptz']['output']>;
  widget_id?: Maybe<Scalars['uuid']['output']>;
  width?: Maybe<Scalars['numeric']['output']>;
};

/** order by min() on columns of table "widget_sticker" */
export type Widget_Sticker_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image_id?: InputMaybe<Order_By>;
  left?: InputMaybe<Order_By>;
  top?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  widget_id?: InputMaybe<Order_By>;
  width?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "widget_sticker" */
export type Widget_Sticker_Mutation_Response = {
  __typename?: 'widget_sticker_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Widget_Sticker>;
};

/** on_conflict condition type for table "widget_sticker" */
export type Widget_Sticker_On_Conflict = {
  constraint: Widget_Sticker_Constraint;
  update_columns?: Array<Widget_Sticker_Update_Column>;
  where?: InputMaybe<Widget_Sticker_Bool_Exp>;
};

/** Ordering options when selecting data from "widget_sticker". */
export type Widget_Sticker_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image_id?: InputMaybe<Order_By>;
  left?: InputMaybe<Order_By>;
  top?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  widget?: InputMaybe<Widget_Order_By>;
  widget_id?: InputMaybe<Order_By>;
  width?: InputMaybe<Order_By>;
};

/** primary key columns input for table: widget_sticker */
export type Widget_Sticker_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "widget_sticker" */
export enum Widget_Sticker_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  ImageId = 'image_id',
  /** column name */
  Left = 'left',
  /** column name */
  Top = 'top',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  WidgetId = 'widget_id',
  /** column name */
  Width = 'width'
}

/** input type for updating data in table "widget_sticker" */
export type Widget_Sticker_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  image_id?: InputMaybe<Scalars['String']['input']>;
  left?: InputMaybe<Scalars['numeric']['input']>;
  top?: InputMaybe<Scalars['numeric']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  widget_id?: InputMaybe<Scalars['uuid']['input']>;
  width?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate stddev on columns */
export type Widget_Sticker_Stddev_Fields = {
  __typename?: 'widget_sticker_stddev_fields';
  left?: Maybe<Scalars['Float']['output']>;
  top?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "widget_sticker" */
export type Widget_Sticker_Stddev_Order_By = {
  left?: InputMaybe<Order_By>;
  top?: InputMaybe<Order_By>;
  width?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Widget_Sticker_Stddev_Pop_Fields = {
  __typename?: 'widget_sticker_stddev_pop_fields';
  left?: Maybe<Scalars['Float']['output']>;
  top?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "widget_sticker" */
export type Widget_Sticker_Stddev_Pop_Order_By = {
  left?: InputMaybe<Order_By>;
  top?: InputMaybe<Order_By>;
  width?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Widget_Sticker_Stddev_Samp_Fields = {
  __typename?: 'widget_sticker_stddev_samp_fields';
  left?: Maybe<Scalars['Float']['output']>;
  top?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "widget_sticker" */
export type Widget_Sticker_Stddev_Samp_Order_By = {
  left?: InputMaybe<Order_By>;
  top?: InputMaybe<Order_By>;
  width?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "widget_sticker" */
export type Widget_Sticker_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Widget_Sticker_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Widget_Sticker_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  image_id?: InputMaybe<Scalars['String']['input']>;
  left?: InputMaybe<Scalars['numeric']['input']>;
  top?: InputMaybe<Scalars['numeric']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
  widget_id?: InputMaybe<Scalars['uuid']['input']>;
  width?: InputMaybe<Scalars['numeric']['input']>;
};

/** aggregate sum on columns */
export type Widget_Sticker_Sum_Fields = {
  __typename?: 'widget_sticker_sum_fields';
  left?: Maybe<Scalars['numeric']['output']>;
  top?: Maybe<Scalars['numeric']['output']>;
  width?: Maybe<Scalars['numeric']['output']>;
};

/** order by sum() on columns of table "widget_sticker" */
export type Widget_Sticker_Sum_Order_By = {
  left?: InputMaybe<Order_By>;
  top?: InputMaybe<Order_By>;
  width?: InputMaybe<Order_By>;
};

/** update columns of table "widget_sticker" */
export enum Widget_Sticker_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  ImageId = 'image_id',
  /** column name */
  Left = 'left',
  /** column name */
  Top = 'top',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  WidgetId = 'widget_id',
  /** column name */
  Width = 'width'
}

export type Widget_Sticker_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Widget_Sticker_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Widget_Sticker_Set_Input>;
  /** filter the rows which have to be updated */
  where: Widget_Sticker_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Widget_Sticker_Var_Pop_Fields = {
  __typename?: 'widget_sticker_var_pop_fields';
  left?: Maybe<Scalars['Float']['output']>;
  top?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "widget_sticker" */
export type Widget_Sticker_Var_Pop_Order_By = {
  left?: InputMaybe<Order_By>;
  top?: InputMaybe<Order_By>;
  width?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Widget_Sticker_Var_Samp_Fields = {
  __typename?: 'widget_sticker_var_samp_fields';
  left?: Maybe<Scalars['Float']['output']>;
  top?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "widget_sticker" */
export type Widget_Sticker_Var_Samp_Order_By = {
  left?: InputMaybe<Order_By>;
  top?: InputMaybe<Order_By>;
  width?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Widget_Sticker_Variance_Fields = {
  __typename?: 'widget_sticker_variance_fields';
  left?: Maybe<Scalars['Float']['output']>;
  top?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "widget_sticker" */
export type Widget_Sticker_Variance_Order_By = {
  left?: InputMaybe<Order_By>;
  top?: InputMaybe<Order_By>;
  width?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "widget" */
export type Widget_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Widget_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Widget_Stream_Cursor_Value_Input = {
  config?: InputMaybe<Scalars['jsonb']['input']>;
  created_at?: InputMaybe<Scalars['timestamptz']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  index?: InputMaybe<Scalars['Int']['input']>;
  invitation_id?: InputMaybe<Scalars['uuid']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamptz']['input']>;
};

/** aggregate sum on columns */
export type Widget_Sum_Fields = {
  __typename?: 'widget_sum_fields';
  index?: Maybe<Scalars['Int']['output']>;
};

/** order by sum() on columns of table "widget" */
export type Widget_Sum_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** update columns of table "widget" */
export enum Widget_Update_Column {
  /** column name */
  Config = 'config',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Index = 'index',
  /** column name */
  InvitationId = 'invitation_id',
  /** column name */
  Type = 'type',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Widget_Updates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<Widget_Append_Input>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _delete_at_path?: InputMaybe<Widget_Delete_At_Path_Input>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _delete_elem?: InputMaybe<Widget_Delete_Elem_Input>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _delete_key?: InputMaybe<Widget_Delete_Key_Input>;
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Widget_Inc_Input>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<Widget_Prepend_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Widget_Set_Input>;
  /** filter the rows which have to be updated */
  where: Widget_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Widget_Var_Pop_Fields = {
  __typename?: 'widget_var_pop_fields';
  index?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "widget" */
export type Widget_Var_Pop_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Widget_Var_Samp_Fields = {
  __typename?: 'widget_var_samp_fields';
  index?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "widget" */
export type Widget_Var_Samp_Order_By = {
  index?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Widget_Variance_Fields = {
  __typename?: 'widget_variance_fields';
  index?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "widget" */
export type Widget_Variance_Order_By = {
  index?: InputMaybe<Order_By>;
};

export type SaveRefreshTokenMutationVariables = Exact<{
  object: User_Tokens_Insert_Input;
}>;


export type SaveRefreshTokenMutation = { __typename?: 'mutation_root', insert_user_tokens_one?: { __typename?: 'user_tokens', id: string } | null };

export type UpdateTokenLastUsedByIdMutationVariables = Exact<{
  tokenId: Scalars['uuid']['input'];
}>;


export type UpdateTokenLastUsedByIdMutation = { __typename?: 'mutation_root', update_user_tokens_by_pk?: { __typename?: 'user_tokens', id: string } | null };

export type DeleteTokenByIdMutationVariables = Exact<{
  tokenId: Scalars['uuid']['input'];
}>;


export type DeleteTokenByIdMutation = { __typename?: 'mutation_root', delete_user_tokens_by_pk?: { __typename?: 'user_tokens', id: string } | null };

export type DeleteAllUserTokensMutationVariables = Exact<{
  userId: Scalars['uuid']['input'];
}>;


export type DeleteAllUserTokensMutation = { __typename?: 'mutation_root', delete_user_tokens?: { __typename?: 'user_tokens_mutation_response', affected_rows: number } | null };

export type RegisterUserMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  profile_image?: InputMaybe<Scalars['String']['input']>;
  provider?: InputMaybe<Scalars['String']['input']>;
  provider_id?: InputMaybe<Scalars['String']['input']>;
  accept_marketing?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type RegisterUserMutation = { __typename?: 'mutation_root', insert_user_one?: { __typename?: 'user', id: string, email?: string | null, name?: string | null, profile_image?: string | null, is_admin?: boolean | null, created_at?: string | null } | null };

export type UploadInvitationImageMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
  invitation_id: Scalars['uuid']['input'];
  widget_id?: InputMaybe<Scalars['uuid']['input']>;
  type: Scalars['String']['input'];
  mime_type: Scalars['String']['input'];
  bucket: Scalars['String']['input'];
  key: Scalars['String']['input'];
  width?: InputMaybe<Scalars['Int']['input']>;
  height?: InputMaybe<Scalars['Int']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
}>;


export type UploadInvitationImageMutation = { __typename?: 'mutation_root', insert_invitation_attachment_one?: { __typename?: 'invitation_attachment', id: string, invitation_id?: string | null, widget_id?: string | null, type?: string | null, bucket?: string | null, key?: string | null, width?: number | null, height?: number | null, created_at?: string | null } | null };

export type AdminCreateTemplateMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
  invitation_id: Scalars['uuid']['input'];
  order: Scalars['Int']['input'];
}>;


export type AdminCreateTemplateMutation = { __typename?: 'mutation_root', insert_template_one?: { __typename?: 'template', id: string, invitation_id?: string | null, order?: number | null, created_at?: string | null } | null };

export type AdminUpdateUserRoleMutationVariables = Exact<{
  userId: Scalars['uuid']['input'];
  isAdmin: Scalars['Boolean']['input'];
}>;


export type AdminUpdateUserRoleMutation = { __typename?: 'mutation_root', update_user_by_pk?: { __typename?: 'user', id: string, email?: string | null, name?: string | null, is_admin?: boolean | null, updated_at?: string | null } | null };

export type AdminUpdateTemplateStageMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
  order: Scalars['Int']['input'];
}>;


export type AdminUpdateTemplateStageMutation = { __typename?: 'mutation_root', update_template_by_pk?: { __typename?: 'template', id: string, order?: number | null, updated_at?: string | null } | null };

export type AdminUpdateTemplateTitleMutationVariables = Exact<{
  invitationId: Scalars['uuid']['input'];
  metaTitle: Scalars['String']['input'];
}>;


export type AdminUpdateTemplateTitleMutation = { __typename?: 'mutation_root', update_invitation_by_pk?: { __typename?: 'invitation', id: string, updated_at?: string | null } | null };

export type AdminDeleteTemplateMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
}>;


export type AdminDeleteTemplateMutation = { __typename?: 'mutation_root', delete_template_by_pk?: { __typename?: 'template', id: string } | null };

export type AdminUpdateTemplateOrdersMutationVariables = Exact<{
  updates: Array<Template_Insert_Input> | Template_Insert_Input;
}>;


export type AdminUpdateTemplateOrdersMutation = { __typename?: 'mutation_root', insert_template?: { __typename?: 'template_mutation_response', affected_rows: number } | null };

export type UpdateWidgetConfigMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
  config: Scalars['jsonb']['input'];
}>;


export type UpdateWidgetConfigMutation = { __typename?: 'mutation_root', update_widget_by_pk?: { __typename?: 'widget', id: string, config?: Record<string, any> | null, updated_at?: string | null } | null };

export type UpdateWidgetIndexMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
  index: Scalars['Int']['input'];
}>;


export type UpdateWidgetIndexMutation = { __typename?: 'mutation_root', update_widget_by_pk?: { __typename?: 'widget', id: string, index?: number | null, updated_at?: string | null } | null };

export type DeleteWidgetMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
}>;


export type DeleteWidgetMutation = { __typename?: 'mutation_root', delete_widget_by_pk?: { __typename?: 'widget', id: string } | null };

export type AddWidgetMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
  invitation_id: Scalars['uuid']['input'];
  type: Scalars['String']['input'];
  index: Scalars['Int']['input'];
  config?: InputMaybe<Scalars['jsonb']['input']>;
}>;


export type AddWidgetMutation = { __typename?: 'mutation_root', insert_widget_one?: { __typename?: 'widget', id: string, invitation_id?: string | null, type?: string | null, index?: number | null, config?: Record<string, any> | null, created_at?: string | null } | null };

export type SubmitRsvpAnswerMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
  invitation_id: Scalars['uuid']['input'];
  user_tracking_id: Scalars['String']['input'];
  accepted: Scalars['Boolean']['input'];
  form_values?: InputMaybe<Scalars['jsonb']['input']>;
}>;


export type SubmitRsvpAnswerMutation = { __typename?: 'mutation_root', insert_invitation_rsvp_answer_one?: { __typename?: 'invitation_rsvp_answer', id: string, invitation_id?: string | null, user_tracking_id?: string | null, accepted?: boolean | null, form_values?: Record<string, any> | null, created_at?: string | null, updated_at?: string | null } | null };

export type CreateCommentMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
  invitation_id: Scalars['uuid']['input'];
  parent_id?: InputMaybe<Scalars['uuid']['input']>;
  author: Scalars['String']['input'];
  author_profile_image?: InputMaybe<Scalars['String']['input']>;
  body: Scalars['String']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateCommentMutation = { __typename?: 'mutation_root', insert_invitation_comment_one?: { __typename?: 'invitation_comment', id: string, invitation_id?: string | null, parent_id?: string | null, author?: string | null, author_profile_image?: string | null, body?: string | null, created_at?: string | null } | null };

export type UpdateCommentMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
  body: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type UpdateCommentMutation = { __typename?: 'mutation_root', update_invitation_comment_by_pk?: { __typename?: 'invitation_comment', id: string, body?: string | null, updated_at?: string | null } | null };

export type DeleteCommentMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
  password: Scalars['String']['input'];
}>;


export type DeleteCommentMutation = { __typename?: 'mutation_root', update_invitation_comment_by_pk?: { __typename?: 'invitation_comment', id: string, removed_at?: string | null } | null };

export type CreateInvitationMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
  user_id: Scalars['uuid']['input'];
  share_key: Scalars['String']['input'];
  layout_type?: InputMaybe<Scalars['String']['input']>;
  brand_color?: InputMaybe<Scalars['String']['input']>;
  font?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateInvitationMutation = { __typename?: 'mutation_root', insert_invitation_one?: { __typename?: 'invitation', id: string, layout_type?: string | null, brand_color?: string | null, font?: string | null, created_at?: string | null } | null };

export type UpdateInvitationEventInfoMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
  event_at?: InputMaybe<Scalars['timestamptz']['input']>;
  full_day_schedule?: InputMaybe<Scalars['Boolean']['input']>;
  address?: InputMaybe<Scalars['String']['input']>;
  road_address?: InputMaybe<Scalars['String']['input']>;
  place_name?: InputMaybe<Scalars['String']['input']>;
  place_detail?: InputMaybe<Scalars['String']['input']>;
  coord?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateInvitationEventInfoMutation = { __typename?: 'mutation_root', update_invitation_by_pk?: { __typename?: 'invitation', id: string, event_at?: string | null, full_day_schedule?: boolean | null, address?: string | null, road_address?: string | null, place_name?: string | null, place_detail?: string | null, coord?: string | null, updated_at?: string | null } | null };

export type UpdateInvitationOwnersMutationVariables = Exact<{
  invitation_id: Scalars['uuid']['input'];
  owners: Array<Invitation_Owner_Insert_Input> | Invitation_Owner_Insert_Input;
}>;


export type UpdateInvitationOwnersMutation = { __typename?: 'mutation_root', delete_invitation_owner?: { __typename?: 'invitation_owner_mutation_response', affected_rows: number } | null, insert_invitation_owner?: { __typename?: 'invitation_owner_mutation_response', returning: Array<{ __typename?: 'invitation_owner', id: string, invitation_id?: string | null, name?: string | null, role?: string | null, level?: string | null, index?: number | null }> } | null };

export type UpdateInvitationMetaMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
}>;


export type UpdateInvitationMetaMutation = { __typename?: 'mutation_root', update_invitation_by_pk?: { __typename?: 'invitation', id: string, updated_at?: string | null } | null };

export type UpdateInvitationDesignMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
  layout_type?: InputMaybe<Scalars['String']['input']>;
  brand_color?: InputMaybe<Scalars['String']['input']>;
  font?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateInvitationDesignMutation = { __typename?: 'mutation_root', update_invitation_by_pk?: { __typename?: 'invitation', id: string, layout_type?: string | null, brand_color?: string | null, font?: string | null, updated_at?: string | null } | null };

export type DeleteInvitationMutationVariables = Exact<{
  id: Scalars['uuid']['input'];
}>;


export type DeleteInvitationMutation = { __typename?: 'mutation_root', update_invitation_by_pk?: { __typename?: 'invitation', id: string, removed_at?: string | null } | null };

export type SetInvitationVisibilityMutationVariables = Exact<{
  invitation_id: Scalars['uuid']['input'];
  visible: Scalars['Boolean']['input'];
}>;


export type SetInvitationVisibilityMutation = { __typename?: 'mutation_root', update_invitation_share?: { __typename?: 'invitation_share_mutation_response', affected_rows: number } | null };

export type LogInvitationVisitMutationVariables = Exact<{
  invitation_id: Scalars['uuid']['input'];
  user_tracking_id: Scalars['String']['input'];
}>;


export type LogInvitationVisitMutation = { __typename?: 'mutation_root', insert_invitation_visit_log_one?: { __typename?: 'invitation_visit_log', invitation_id?: string | null, visit_at?: string | null } | null };

export type ConfirmOrderMutationVariables = Exact<{
  order_id: Scalars['uuid']['input'];
  status: Scalars['String']['input'];
  payment_key: Scalars['String']['input'];
}>;


export type ConfirmOrderMutation = { __typename?: 'mutation_root', update_order_by_pk?: { __typename?: 'order', id: string, status?: string | null, payment_key?: string | null, updated_at?: string | null } | null };

export type ConfirmFreeOrderMutationVariables = Exact<{
  order_id: Scalars['uuid']['input'];
  status: Scalars['String']['input'];
}>;


export type ConfirmFreeOrderMutation = { __typename?: 'mutation_root', update_order_by_pk?: { __typename?: 'order', id: string, status?: string | null, updated_at?: string | null } | null };


export const SaveRefreshTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SaveRefreshToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"object"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"user_tokens_insert_input"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insert_user_tokens_one"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"object"},"value":{"kind":"Variable","name":{"kind":"Name","value":"object"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<SaveRefreshTokenMutation, SaveRefreshTokenMutationVariables>;
export const UpdateTokenLastUsedByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateTokenLastUsedById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tokenId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update_user_tokens_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pk_columns"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tokenId"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"last_used_at"},"value":{"kind":"StringValue","value":"now()","block":false}},{"kind":"ObjectField","name":{"kind":"Name","value":"updated_at"},"value":{"kind":"StringValue","value":"now()","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateTokenLastUsedByIdMutation, UpdateTokenLastUsedByIdMutationVariables>;
export const DeleteTokenByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteTokenById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tokenId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete_user_tokens_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tokenId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteTokenByIdMutation, DeleteTokenByIdMutationVariables>;
export const DeleteAllUserTokensDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteAllUserTokens"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete_user_tokens"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"affected_rows"}}]}}]}}]} as unknown as DocumentNode<DeleteAllUserTokensMutation, DeleteAllUserTokensMutationVariables>;
export const RegisterUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RegisterUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"profile_image"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"provider"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"provider_id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"accept_marketing"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insert_user_one"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"object"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"profile_image"},"value":{"kind":"Variable","name":{"kind":"Name","value":"profile_image"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"provider"},"value":{"kind":"Variable","name":{"kind":"Name","value":"provider"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"provider_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"provider_id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"accept_marketing"},"value":{"kind":"Variable","name":{"kind":"Name","value":"accept_marketing"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"on_conflict"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"constraint"},"value":{"kind":"EnumValue","value":"user_provider_idx"}},{"kind":"ObjectField","name":{"kind":"Name","value":"update_columns"},"value":{"kind":"ListValue","values":[{"kind":"EnumValue","value":"email"},{"kind":"EnumValue","value":"name"},{"kind":"EnumValue","value":"profile_image"},{"kind":"EnumValue","value":"updated_at"}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profile_image"}},{"kind":"Field","name":{"kind":"Name","value":"is_admin"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}}]}}]} as unknown as DocumentNode<RegisterUserMutation, RegisterUserMutationVariables>;
export const UploadInvitationImageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UploadInvitationImage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"invitation_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"widget_id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mime_type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bucket"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"key"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"width"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"height"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user_id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insert_invitation_attachment_one"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"object"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"invitation_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"invitation_id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"widget_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"widget_id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"mime_type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mime_type"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"bucket"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bucket"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"key"},"value":{"kind":"Variable","name":{"kind":"Name","value":"key"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"width"},"value":{"kind":"Variable","name":{"kind":"Name","value":"width"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"height"},"value":{"kind":"Variable","name":{"kind":"Name","value":"height"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user_id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"invitation_id"}},{"kind":"Field","name":{"kind":"Name","value":"widget_id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"bucket"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}}]}}]} as unknown as DocumentNode<UploadInvitationImageMutation, UploadInvitationImageMutationVariables>;
export const AdminCreateTemplateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminCreateTemplate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"invitation_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"order"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insert_template_one"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"object"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"invitation_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"invitation_id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"order"},"value":{"kind":"Variable","name":{"kind":"Name","value":"order"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"invitation_id"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}}]}}]} as unknown as DocumentNode<AdminCreateTemplateMutation, AdminCreateTemplateMutationVariables>;
export const AdminUpdateUserRoleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminUpdateUserRole"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isAdmin"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update_user_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pk_columns"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"is_admin"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isAdmin"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"is_admin"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]}}]} as unknown as DocumentNode<AdminUpdateUserRoleMutation, AdminUpdateUserRoleMutationVariables>;
export const AdminUpdateTemplateStageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminUpdateTemplateStage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"order"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update_template_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pk_columns"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"order"},"value":{"kind":"Variable","name":{"kind":"Name","value":"order"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"order"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]}}]} as unknown as DocumentNode<AdminUpdateTemplateStageMutation, AdminUpdateTemplateStageMutationVariables>;
export const AdminUpdateTemplateTitleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminUpdateTemplateTitle"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"invitationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"metaTitle"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update_invitation_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pk_columns"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"invitationId"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]}}]} as unknown as DocumentNode<AdminUpdateTemplateTitleMutation, AdminUpdateTemplateTitleMutationVariables>;
export const AdminDeleteTemplateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminDeleteTemplate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete_template_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AdminDeleteTemplateMutation, AdminDeleteTemplateMutationVariables>;
export const AdminUpdateTemplateOrdersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AdminUpdateTemplateOrders"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updates"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"template_insert_input"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insert_template"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updates"}}},{"kind":"Argument","name":{"kind":"Name","value":"on_conflict"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"constraint"},"value":{"kind":"EnumValue","value":"template_pkey"}},{"kind":"ObjectField","name":{"kind":"Name","value":"update_columns"},"value":{"kind":"ListValue","values":[{"kind":"EnumValue","value":"order"}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"affected_rows"}}]}}]}}]} as unknown as DocumentNode<AdminUpdateTemplateOrdersMutation, AdminUpdateTemplateOrdersMutationVariables>;
export const UpdateWidgetConfigDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateWidgetConfig"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"config"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"jsonb"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update_widget_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pk_columns"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"config"},"value":{"kind":"Variable","name":{"kind":"Name","value":"config"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"config"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]}}]} as unknown as DocumentNode<UpdateWidgetConfigMutation, UpdateWidgetConfigMutationVariables>;
export const UpdateWidgetIndexDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateWidgetIndex"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"index"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update_widget_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pk_columns"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"index"},"value":{"kind":"Variable","name":{"kind":"Name","value":"index"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]}}]} as unknown as DocumentNode<UpdateWidgetIndexMutation, UpdateWidgetIndexMutationVariables>;
export const DeleteWidgetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteWidget"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete_widget_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteWidgetMutation, DeleteWidgetMutationVariables>;
export const AddWidgetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AddWidget"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"invitation_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"index"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"config"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"jsonb"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insert_widget_one"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"object"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"invitation_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"invitation_id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"index"},"value":{"kind":"Variable","name":{"kind":"Name","value":"index"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"config"},"value":{"kind":"Variable","name":{"kind":"Name","value":"config"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"invitation_id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"index"}},{"kind":"Field","name":{"kind":"Name","value":"config"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}}]}}]} as unknown as DocumentNode<AddWidgetMutation, AddWidgetMutationVariables>;
export const SubmitRsvpAnswerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SubmitRsvpAnswer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"invitation_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user_tracking_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"accepted"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"form_values"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"jsonb"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insert_invitation_rsvp_answer_one"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"object"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"invitation_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"invitation_id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"user_tracking_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user_tracking_id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"accepted"},"value":{"kind":"Variable","name":{"kind":"Name","value":"accepted"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"form_values"},"value":{"kind":"Variable","name":{"kind":"Name","value":"form_values"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"on_conflict"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"constraint"},"value":{"kind":"EnumValue","value":"invitation_rsvp_answer_invitation_user_idx"}},{"kind":"ObjectField","name":{"kind":"Name","value":"update_columns"},"value":{"kind":"ListValue","values":[{"kind":"EnumValue","value":"accepted"},{"kind":"EnumValue","value":"form_values"},{"kind":"EnumValue","value":"updated_at"}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"invitation_id"}},{"kind":"Field","name":{"kind":"Name","value":"user_tracking_id"}},{"kind":"Field","name":{"kind":"Name","value":"accepted"}},{"kind":"Field","name":{"kind":"Name","value":"form_values"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]}}]} as unknown as DocumentNode<SubmitRsvpAnswerMutation, SubmitRsvpAnswerMutationVariables>;
export const CreateCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"invitation_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"parent_id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"author"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"author_profile_image"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"body"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insert_invitation_comment_one"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"object"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"invitation_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"invitation_id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"parent_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"parent_id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"author"},"value":{"kind":"Variable","name":{"kind":"Name","value":"author"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"author_profile_image"},"value":{"kind":"Variable","name":{"kind":"Name","value":"author_profile_image"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"body"},"value":{"kind":"Variable","name":{"kind":"Name","value":"body"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"invitation_id"}},{"kind":"Field","name":{"kind":"Name","value":"parent_id"}},{"kind":"Field","name":{"kind":"Name","value":"author"}},{"kind":"Field","name":{"kind":"Name","value":"author_profile_image"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}}]}}]} as unknown as DocumentNode<CreateCommentMutation, CreateCommentMutationVariables>;
export const UpdateCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"body"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update_invitation_comment_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pk_columns"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"body"},"value":{"kind":"Variable","name":{"kind":"Name","value":"body"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"updated_at"},"value":{"kind":"StringValue","value":"now()","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"body"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]}}]} as unknown as DocumentNode<UpdateCommentMutation, UpdateCommentMutationVariables>;
export const DeleteCommentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteComment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update_invitation_comment_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pk_columns"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"removed_at"},"value":{"kind":"StringValue","value":"now()","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"removed_at"}}]}}]}}]} as unknown as DocumentNode<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const CreateInvitationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateInvitation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"share_key"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"layout_type"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"brand_color"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"font"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insert_invitation_one"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"object"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"layout_type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"layout_type"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"brand_color"},"value":{"kind":"Variable","name":{"kind":"Name","value":"brand_color"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"font"},"value":{"kind":"Variable","name":{"kind":"Name","value":"font"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"invitation_editors"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"data"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user_id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"user_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user_id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"is_creator"},"value":{"kind":"BooleanValue","value":true}}]}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"invitation_shares"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"data"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user_id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"share_key"},"value":{"kind":"Variable","name":{"kind":"Name","value":"share_key"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"activation_method"},"value":{"kind":"StringValue","value":"public","block":false}}]}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"layout_type"}},{"kind":"Field","name":{"kind":"Name","value":"brand_color"}},{"kind":"Field","name":{"kind":"Name","value":"font"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}}]}}]} as unknown as DocumentNode<CreateInvitationMutation, CreateInvitationMutationVariables>;
export const UpdateInvitationEventInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateInvitationEventInfo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"event_at"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"timestamptz"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"full_day_schedule"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"road_address"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"place_name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"place_detail"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"coord"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update_invitation_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pk_columns"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"event_at"},"value":{"kind":"Variable","name":{"kind":"Name","value":"event_at"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"full_day_schedule"},"value":{"kind":"Variable","name":{"kind":"Name","value":"full_day_schedule"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"road_address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"road_address"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"place_name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"place_name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"place_detail"},"value":{"kind":"Variable","name":{"kind":"Name","value":"place_detail"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"coord"},"value":{"kind":"Variable","name":{"kind":"Name","value":"coord"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"event_at"}},{"kind":"Field","name":{"kind":"Name","value":"full_day_schedule"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"road_address"}},{"kind":"Field","name":{"kind":"Name","value":"place_name"}},{"kind":"Field","name":{"kind":"Name","value":"place_detail"}},{"kind":"Field","name":{"kind":"Name","value":"coord"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]}}]} as unknown as DocumentNode<UpdateInvitationEventInfoMutation, UpdateInvitationEventInfoMutationVariables>;
export const UpdateInvitationOwnersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateInvitationOwners"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"invitation_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"owners"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"invitation_owner_insert_input"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"delete_invitation_owner"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"invitation_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"invitation_id"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"affected_rows"}}]}},{"kind":"Field","name":{"kind":"Name","value":"insert_invitation_owner"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"objects"},"value":{"kind":"Variable","name":{"kind":"Name","value":"owners"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"returning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"invitation_id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"index"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateInvitationOwnersMutation, UpdateInvitationOwnersMutationVariables>;
export const UpdateInvitationMetaDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateInvitationMeta"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update_invitation_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pk_columns"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"ObjectValue","fields":[]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]}}]} as unknown as DocumentNode<UpdateInvitationMetaMutation, UpdateInvitationMetaMutationVariables>;
export const UpdateInvitationDesignDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateInvitationDesign"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"layout_type"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"brand_color"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"font"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update_invitation_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pk_columns"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"layout_type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"layout_type"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"brand_color"},"value":{"kind":"Variable","name":{"kind":"Name","value":"brand_color"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"font"},"value":{"kind":"Variable","name":{"kind":"Name","value":"font"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"layout_type"}},{"kind":"Field","name":{"kind":"Name","value":"brand_color"}},{"kind":"Field","name":{"kind":"Name","value":"font"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]}}]} as unknown as DocumentNode<UpdateInvitationDesignMutation, UpdateInvitationDesignMutationVariables>;
export const DeleteInvitationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteInvitation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update_invitation_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pk_columns"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"removed_at"},"value":{"kind":"StringValue","value":"now()","block":false}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"removed_at"}}]}}]}}]} as unknown as DocumentNode<DeleteInvitationMutation, DeleteInvitationMutationVariables>;
export const SetInvitationVisibilityDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetInvitationVisibility"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"invitation_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"visible"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update_invitation_share"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"invitation_id"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"invitation_id"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"visible"},"value":{"kind":"Variable","name":{"kind":"Name","value":"visible"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"affected_rows"}}]}}]}}]} as unknown as DocumentNode<SetInvitationVisibilityMutation, SetInvitationVisibilityMutationVariables>;
export const LogInvitationVisitDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LogInvitationVisit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"invitation_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user_tracking_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insert_invitation_visit_log_one"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"object"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"invitation_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"invitation_id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"user_tracking_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user_tracking_id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"invitation_id"}},{"kind":"Field","name":{"kind":"Name","value":"visit_at"}}]}}]}}]} as unknown as DocumentNode<LogInvitationVisitMutation, LogInvitationVisitMutationVariables>;
export const ConfirmOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ConfirmOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"order_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payment_key"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update_order_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pk_columns"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"order_id"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"payment_key"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payment_key"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"payment_key"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]}}]} as unknown as DocumentNode<ConfirmOrderMutation, ConfirmOrderMutationVariables>;
export const ConfirmFreeOrderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ConfirmFreeOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"order_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update_order_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pk_columns"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"order_id"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}}]}}]}}]} as unknown as DocumentNode<ConfirmFreeOrderMutation, ConfirmFreeOrderMutationVariables>;