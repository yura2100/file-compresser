import { Type } from '@nestjs/common';
import { ArgsType, Field, Int, ObjectType } from '@nestjs/graphql';

interface IEdgeType<T> {
  cursor: string;
  node: T;
}

export interface IPaginatedType<T> {
  edges: IEdgeType<T>[];
  totalCount: number;
  hasNextPage: boolean;
  endCursor: string;
}

export function Paginated<T>(classRef: Type<T>): Type<IPaginatedType<T>> {
  @ObjectType(`${classRef.name}Edge`)
  abstract class EdgeType {
    @Field(() => String)
    cursor!: string;

    @Field(() => classRef)
    node!: T;
  }

  @ObjectType({ isAbstract: true })
  abstract class PaginatedType implements IPaginatedType<T> {
    @Field(() => [EdgeType], { nullable: true })
    edges!: EdgeType[];

    @Field(() => Int)
    totalCount!: number;

    @Field(() => Boolean)
    hasNextPage!: boolean;

    @Field(() => String)
    endCursor!: string;
  }
  return PaginatedType as Type<IPaginatedType<T>>;
}

@ArgsType()
export class PaginationArgs {
  @Field(() => String)
  cursor!: string;

  @Field(() => Int, { defaultValue: 500 })
  limit = 500;
}
