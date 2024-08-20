/* tslint:disable */
import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
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
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any; }
};

export type Mutation = {
  __typename?: 'Mutation';
  triggerSubscription: Scalars['Boolean']['output'];
  uploadFile: Scalars['Boolean']['output'];
};


export type MutationTriggerSubscriptionArgs = {
  someMessage: Scalars['String']['input'];
};


export type MutationUploadFileArgs = {
  file: Scalars['Upload']['input'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  somethingHappened: Scalars['String']['output'];
};

export type HelloWorldQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloWorldQuery = { __typename?: 'Query', hello: string };

export type UploadFileMutationVariables = Exact<{
  file: Scalars['Upload']['input'];
}>;


export type UploadFileMutation = { __typename?: 'Mutation', uploadFile: boolean };

export type TriggerSubscriptionMutationVariables = Exact<{
  message: Scalars['String']['input'];
}>;


export type TriggerSubscriptionMutation = { __typename?: 'Mutation', triggerSubscription: boolean };

export type SomethingHappenedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type SomethingHappenedSubscription = { __typename?: 'Subscription', somethingHappened: string };

export const HelloWorldDocument = gql`
    query helloWorld {
  hello
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class HelloWorldGQL extends Apollo.Query<HelloWorldQuery, HelloWorldQueryVariables> {
    override document = HelloWorldDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UploadFileDocument = gql`
    mutation uploadFile($file: Upload!) {
  uploadFile(file: $file)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UploadFileGQL extends Apollo.Mutation<UploadFileMutation, UploadFileMutationVariables> {
    override document = UploadFileDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const TriggerSubscriptionDocument = gql`
    mutation triggerSubscription($message: String!) {
  triggerSubscription(someMessage: $message)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class TriggerSubscriptionGQL extends Apollo.Mutation<TriggerSubscriptionMutation, TriggerSubscriptionMutationVariables> {
    override document = TriggerSubscriptionDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const SomethingHappenedDocument = gql`
    subscription somethingHappened {
  somethingHappened
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SomethingHappenedGQL extends Apollo.Subscription<SomethingHappenedSubscription, SomethingHappenedSubscriptionVariables> {
    override document = SomethingHappenedDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }