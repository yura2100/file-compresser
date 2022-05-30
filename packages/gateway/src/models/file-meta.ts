import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FileMeta {
  @Field(() => Int)
  size!: number;

  @Field(() => String)
  mime!: string;

  @Field(() => String)
  name!: string;

  @Field(() => String)
  link!: string;

  @Field(() => String)
  key!: string;
}
