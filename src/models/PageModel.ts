import mongoose from 'mongoose';

/** @ts-ignore - This allow the the typescript compiler to ignore untyped JS modules/libraries */

//@ts-ignore
import mongoosedbErrorHandler from 'mongoose-mongodb-errors';

export interface Page {
  title: string;
  description: string;
  tags: string[];
}

export interface User {
  id: string;
  created_at: Date;
}

export type PageDocument = mongoose.Document & {
  id: string;
  created_at: Date;
  page: Page;
  user: User;
};

const pageSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      lowercase: true,
      required: true,
    },
    page: {
      title: {
        type: String,
        lowercase: true,
        required: true,
      },
      description: {
        type: String,
        lowercase: true,
        required: true,
      },
      tags: [
        {
          type: String,
          lowercase: true,
          required: true,
        },
      ],
    },
    user: {
      id: {
        type: String,
        lowercase: true,
        required: true,
      },
      created_at: { type: String, lowercase: true, required: true },
    },
    created_at: { type: String, lowercase: true, required: true },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

pageSchema.plugin(mongoosedbErrorHandler);

const PageModel = mongoose.model<PageDocument>('Page', pageSchema);

export default PageModel;
