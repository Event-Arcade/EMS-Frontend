export default interface FeedBack {
    id?: number;
    comment: string;
    postedOn?: Date;
    rating : number;    
    serviceId: number;
    applicationUserId: string;
    feedBackStaticResourceUrls? : string[];
    feedBackStaticResourceFiles? : File[];
  }