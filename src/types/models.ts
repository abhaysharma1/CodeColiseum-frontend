/**
 * Frontend view models for API payloads.
 *
 * The SPA must not depend on `@prisma/client` (that would pull the ORM into the
 * browser bundle). These interfaces mirror the scalar fields of the Prisma
 * models that API responses expose. Dates arrive as ISO strings over HTTP but
 * are typed as `Date` to stay compatible with the migrated components, which
 * already pass them to `new Date(...)` / `date-fns`.
 */
import type {
  AiProcessingStatus,
  ExamAttemptStatus,
  ExamStatus,
  ExecutionStatus,
  groupType,
  ProblemApprovalStatus,
  ProblemOwnerType,
  ProblemVisibility,
  problemDifficulty,
} from "./prisma-enums";

export interface User {
  id: string;
  name: string;
  email: string;
  isOnboarded: boolean;
  emailVerified: boolean;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  globalRoleId: string | null;
}

export interface Group {
  id: string;
  name: string;
  description: string | null;
  creatorId: string;
  noOfMembers: number;
  createdAt: Date;
  updatedAt: Date;
  joinByLink: boolean;
  type: groupType;
  aiEnabled: boolean;
  aiMaxMessages: number | null;
  aiMaxTokens: number | null;
}

export interface Exam {
  id: string;
  title: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  isPublished: boolean;
  durationMin: number;
  sebEnabled: boolean;
  status: ExamStatus;
  creatorId: string;
  startDate: Date;
  endDate: Date;
}

export interface Problem {
  id: string;
  number: number;
  title: string;
  description: string;
  difficulty: problemDifficulty;
  source: string;
  isPublished: boolean;
  hidden: boolean;
  ownerType: ProblemOwnerType;
  ownerId: string | null;
  visibility: ProblemVisibility;
  approvalStatus: ProblemApprovalStatus;
  approvedById: string | null;
  approvedAt: Date | null;
  rejectionReason: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ExamResult {
  id: string;
  score: number;
  createdAt: Date;
  examId: string;
  userId: string;
}

export interface Tag {
  id: string;
  name: string;
}

export interface AiEvaluation {
  id: string;
  submissionId: string;
  timeComplexity: string | null;
  spaceComplexity: string | null;
  optimal: boolean | null;
  qualityScore: number | null;
  aiScore: number | null;
  feedback: string | null;
  createdAt: Date;
  examId: string | null;
}

export interface selfSubmission {
  id: string;
  sourceCode: string;
  language: string;
  passedTestcases: number;
  totalTestcases: number;
  executionTime: number | null;
  memory: number | null;
  stderr: string | null;
  createdAt: Date;
  status: ExecutionStatus;
  userId: string;
  problemId: string;
}

export interface ExamAttempt {
  id: string;
  examId: string;
  studentId: string;
  status: ExamAttemptStatus;
  lastHeartbeatAt: Date;
  disconnectCount: number;
  startedAt: Date;
  expiresAt: Date;
  submittedAt: Date | null;
  totalScore: number;
}

export interface Submission {
  id: string;
  attemptId: string;
  problemId: string;
  language: string;
  sourceCode: string;
  passedTestcases: number;
  totalTestcases: number;
  executionTime: number | null;
  memory: number | null;
  stderr: string | null;
  isFinal: boolean;
  aiQueued: boolean;
  aiStatus: AiProcessingStatus;
  status: ExecutionStatus;
  createdAt: Date;
  updatedAt: Date;
  userId: string | null;
  examId: string | null;
  aiEvaluation?: AiEvaluation | null;
}

export interface GroupOverallStats {
  id: string;
  groupId: string;
  totalExams: number;
  totalStudents: number;
  activeStudents: number;
  avgScoreAllExams: number;
  overallPassRate: number;
  completionRate: number;
  highestExamAvg: number;
  lowestExamAvg: number;
  weakestProblemId: string | null;
  hardestProblemId: string | null;
  avgTimePerStudent: number;
  totalTimeSpent: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface GroupProblemStats {
  id: string;
  groupId: string;
  problemId: string;
  totalStudents: number;
  attemptedCount: number;
  acceptedCount: number;
  totalAttempts: number;
  successRate: number;
  avgRuntime: number;
  avgMemory: number;
  avgTime: number;
  difficultyTier: string;
  failureRate: number;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Runtime enum constants are re-exported so migrated components can continue to
 * import them from a single `@/types/models` module.
 */
export {
  AiProcessingStatus,
  ExamAttemptStatus,
  ExamStatus,
  ExecutionStatus,
  groupType,
  ProblemApprovalStatus,
  ProblemOwnerType,
  ProblemVisibility,
  problemDifficulty,
  ProgrammingLanguage,
  RoleScope,
} from "./prisma-enums";
