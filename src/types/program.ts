export interface Program {
  id: string;
  name: string;
  slug: string;
  description?: string;
  poster_images: string;
  poster_image: number;
  price: number;
  is_course_free: boolean;
  status: string;
  duration_in_weeks: number;
  course_level: string;
  instructor: {
    id: number;
    designation: string | null;
    description: string | null;
    iap_user: {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
      profile_photo: string | null;
      is_active: boolean;
      institute: number;
      groups: number[];
    };
    introductory_media: string | null;
  };
  instructor_detail: {
    designation: string;
    description: string;
    introductory_media: string | null;
    iap_user: {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
      profile_photo: string | null;
    };
  };
  short_description: string;
  long_description: string;
  offer_first_section_free: boolean;
  is_cohort: boolean;
  cohort_attendance: boolean;
  is_transcript: boolean | null;
  what_will_student_learn: string;
  prerequisite_for_course: string;
  enable_certificate: boolean;
  access_post_graduation_in_weeks: number;
  configure_custom_score: boolean;
  enable_student_document: boolean;
  course_type: string;
  eligible_tuition_fees: string;
  start_date: string | null;
  end_date: string | null;
  enable_paid_at_school: boolean;
  section: Section[];
  total_content_type: {
    total_lessons: number;
    total_quizes: number;
    total_assignments: number;
  };
  category?: {
    id: number;
    name: string;
    created_date: string;
    modified_date: string;
  };
  intro_video_media?: {
    id: number;
    name: string;
    media_type: string;
    media_file: string | null;
    url: string;
    is_private: boolean;
    video_type: 'youtube' | 'vimeo';
  };
  currency: {
    id: number;
    currency_name: string;
    currency_description: string;
    is_default: boolean;
    short_code: string;
    prefix: string;
    suffix: string | null;
  };
  institute: {
    id?: number;
    name: string;
    domain: string;
    logo: string;
    primary_color: string;
    secondary_color: string;
  };
  created_date: string;
  modified_date: string;
  discount?: {
    id: number;
    price: number;
    discount_type: string;
    value: string;
    course: string;
    cohort: null;
  };
  reviewers: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    profile_photo: string | null;
    is_active: boolean;
    groups: number[];
  }[];
}

export interface Section {
  id: string;
  name: string;
  index: number;
  description: string | null;
  days_to_complete: number | null;
  content: ContentItem[];
}

export interface ContentItem {
  id: string;
  name: string;
  index: number;
  content_type: 'lesson' | 'quiz' | 'quota';
  is_completed: boolean;
  is_unlocked: boolean;
  can_skip: boolean;
  custom_weightage: number | null;
} 