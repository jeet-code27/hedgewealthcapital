import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const ImageSchema = new Schema({ url: String, publicId: String, alt: String, caption: String }, { _id: false });

const PostSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    excerpt: { type: String, default: "" },
    content: { type: String, default: "" },
    featuredImage: { type: ImageSchema, default: {} },
    author: { type: Schema.Types.ObjectId, ref: "Author", default: null },
    category: { type: Schema.Types.ObjectId, ref: "Category", default: null },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    faqs: [{ _id: false, question: String, answer: String }],
    relatedPosts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    status: { type: String, enum: ["Draft", "Published"], default: "Draft", index: true },
    isFeatured: { type: Boolean, default: false },
    publishedAt: { type: Date, default: null, index: true },
    readingMinutes: { type: Number, default: 1 },
    seo: {
      metaTitle: { type: String, default: "" },
      metaDescription: { type: String, default: "" },
      focusKeyword: { type: String, default: "" },
      canonicalUrl: { type: String, default: "" },
      ogTitle: { type: String, default: "" },
      ogDescription: { type: String, default: "" },
      ogImage: { type: String, default: "" },
      noIndex: { type: Boolean, default: false },
    },
  },
  { timestamps: true },
);

const CategorySchema = new Schema(
  { name: { type: String, required: true, trim: true }, slug: { type: String, required: true, unique: true }, description: { type: String, default: "" } },
  { timestamps: true },
);

const TagSchema = new Schema({ name: { type: String, required: true, trim: true }, slug: { type: String, required: true, unique: true } }, { timestamps: true });

const AuthorSchema = new Schema(
  { name: { type: String, required: true, trim: true }, slug: { type: String, required: true, unique: true }, role: { type: String, default: "" }, bio: { type: String, default: "" }, avatar: { type: String, default: "" } },
  { timestamps: true },
);

/** One document per website form submission; `fields` keeps the form's own shape. */
const SubmissionSchema = new Schema(
  {
    form: { type: String, required: true, index: true },
    name: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    fields: { type: Schema.Types.Mixed, default: {} },
    status: { type: String, enum: ["New", "Contacted", "In Progress", "Closed", "Spam"], default: "New", index: true },
    notes: { type: String, default: "" },
    emails: { admin: { type: Boolean, default: false }, customer: { type: Boolean, default: false } },
    meta: { ip: String, userAgent: String, page: String },
  },
  { timestamps: true },
);
SubmissionSchema.index({ createdAt: -1 });

const get = <T>(name: string, schema: Schema<T>) => (models[name] as Model<T>) ?? model<T>(name, schema);

export const Post = get("Post", PostSchema);
export const Category = get("Category", CategorySchema);
export const Tag = get("Tag", TagSchema);
export const Author = get("Author", AuthorSchema);
export const Submission = get("Submission", SubmissionSchema);

export type PostDoc = InferSchemaType<typeof PostSchema>;
export type SubmissionDoc = InferSchemaType<typeof SubmissionSchema>;
