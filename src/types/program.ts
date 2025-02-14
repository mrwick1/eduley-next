export interface Program {
  id: string;
  name: string;
  poster_images: string;
  price: number;
  currency: {
    prefix: string;
  };
  instructor_detail: {
    iap_user: {
      first_name: string;
      last_name: string;
    };
  };
  is_course_free: boolean;
  duration_in_weeks: number;
  status: string;
  short_description: string;
  course_level: string;
} 