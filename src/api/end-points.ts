export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL;
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const HOST_API = process.env.NEXT_PUBLIC_HOST_API_KEY || '';
// console.log(BASE_URL,'akr');
export const API_ENDPOINTS = {
  BASE: BASE_URL,
  API: API_URL,
  SOCKET: SOCKET_URL,

  // Authentication
  AUTH: {
    LOGIN: `${BASE_URL}/student/login/`,
    REGISTER: `${BASE_URL}/student/register/`,
    EMAIL_VERIFICATION: `${BASE_URL}/student/send_verification_email/`,
    RESEND_EMAIL_VERIFICATION: `${BASE_URL}/student/resend_verification_email/`,
    CHANGE_PASSWORD_EMAIL: `${BASE_URL}/student/change_password_email/`,
    SET_NEW_PASSWORD: `${BASE_URL}/student/change_password/`,
  },

  // Student
  STUDENT: {
    BASE: `${BASE_URL}/student/`,
    PROFILE: `${BASE_URL}/student/profile/`,
    VERIFICATION_DETAILS: `${BASE_URL}/student/student-verification-detail/`,
    INSTITUTE_DOCUMENT: `${BASE_URL}/student/student-document-submission/`,
    INSTITUTE_DOCUMENT_LIST: `${BASE_URL}/student/institute-document/`,
  },

  // Subscription
  SUBSCRIPTION: {
    BASE: `${BASE_URL}/subscription/`,
    DASHBOARD: `${BASE_URL}/subscription/dashboard/`,
    TAX_DOCUMENT: `${API_URL}/subscription/tax-document/`,
    QUIZ: `${BASE_URL}/subscription/quiz/`,
    QUIZ_REVIEW: `${BASE_URL}/subscription/quiz_review/`,
    ASSIGNMENT: `${BASE_URL}/subscription/assignment/`,
    ASSIGNMENT_REVIEW: `${BASE_URL}/subscription/assignment_review/`,
    ASSIGNMENT_SUBJECTIVE: `${BASE_URL}/subscription/assignment-subjective/`,
    UPGRADE_TO_FULL: `${BASE_URL}/subscription/upgrade/`,
    LESSON_NEXT_STEPS: `${BASE_URL}/subscription/lesson-additional-steps/`,
  },

  // Courses
  COURSE: {
    BASE: `${BASE_URL}/course/`,
    CATEGORY: `${BASE_URL}/course/category/`,
    MODULE: `${BASE_URL}/course/course_module/`,
    CONTENT: `${BASE_URL}/course/content/`,
    VIEW_LESSON: `${BASE_URL}/course/view-lesson/`,
    LIVE_SESSION: `${BASE_URL}/course/live-session/`,
    JOIN_LIVE_SESSION: `${BASE_URL}/course/live-session/redirect-link/`,
  },

  // Gamification
  GAMIFICATION: {
    LEVELS: `${BASE_URL}/gamification/levels/`,
    POINTS: `${BASE_URL}/gamification/rewardpoints/`,
    REWARDS: `${BASE_URL}/gamification/rewards/`,
    LEADERBOARD: `${BASE_URL}/gamification/leader-board/`,
    SOCIAL_SHARE: `${BASE_URL}/gamification/social_share/`,
  },

  // Payments
  PAYMENT: {
    BASE: `${BASE_URL}/subscription/full_fee_pay/`,
    PLAN: `${BASE_URL}/course/installment_plan/`,
    INSTALLMENT: `${BASE_URL}/subscription/installment_fee_pay/`,
    REGISTRATION_FEE: `${BASE_URL}/subscription/registration_fee_pay/`,
    UPCOMING_PAYMENTS: `${BASE_URL}/subscription/payments/`,
    TRANSACTION_DETAILS: `${BASE_URL}/subscription/transactions/`,
    UPCOMING_INSTALLMENTS: `${BASE_URL}/subscription/upcoming_installment/`,
    STUDENT_FINANCIAL_ASSISTANCE: `${BASE_URL}/course/student_financial_assistance/`,
    STATUS: `${BASE_URL}/subscription/checkout-status/`,
  },

  // Documents & Media
  DOCUMENTS: {
    GLOBAL: `${BASE_URL}/subscription/document/global-document/`,
    REQUIREMENTS: `${BASE_URL}/subscription/document/`,
    UPLOAD_FILE: `${BASE_URL}/eduley_media/upload-file/`,
    MEDIA: `${BASE_URL}/eduley_media/media/`,
    DOCUMENT: `${BASE_URL}/eduley_media/document/`,
  },

  // Certificates & Transcripts
  CERTIFICATES: {
    DOWNLOAD: `${BASE_URL}/subscription/certificate/download/`,
    VIEW: `${API_URL}/subscription/certificate/`,
    DOWNLOAD_ALT: `${API_URL}/subscription/certificate/download/`,
    TRANSCRIPT_DOWNLOAD: `${BASE_URL}/subscription/transcript/download/`,
    GPA_DETAILED: `${BASE_URL}/subscription/transcript/gpa/detailed/`,
    GPA_SUMMARY: `${BASE_URL}/subscription/transcript/gpa/summary/`,
  },

  // Forum
  FORUM: {
    BASE: `${BASE_URL}/forum/thread/`,
    ADD: `${BASE_URL}/forum/thread/add/`,
    COMMENT: `${BASE_URL}/forum/thread/comment/`,
  },

  // Notifications
  NOTIFICATIONS: {
    BASE: `${BASE_URL}/notification/`,
    UNSEEN_COUNT: `${BASE_URL}/notification/unseen-count/`,
  },

  // Support
  SUPPORT: {
    STUDENT: `${BASE_URL}/support/ticket/`,
  },

  // Payment Public Key
  PUBLIC_API: `${BASE_URL}/iap/institute/wallet/stripe/public_key/`,

  // Institute
  INSTITUTE: `${BASE_URL}/institute/`,

  // Country & Region
  LOCATION: {
    COUNTRY: `${BASE_URL}/country/`,
    REGION: `${BASE_URL}/region/`,
  },

  // Maintenance
  MAINTENANCE: `${API_URL}/maintenance`,

  // Landing Page & Footer
  LANDING_PAGE: `${BASE_URL}/landing_page/configure/`,
  FOOTER: `${BASE_URL}/institute/`,

  // Quiz & Assignment
  QUIZ_QUESTIONS: `${BASE_URL}/quiz/questions/`,
};
