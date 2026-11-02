import { lazy, Suspense } from "react";
import {
  Navigate,
  Route,
  Routes,
  useParams as useReactRouterParams,
} from "react-router-dom";
import { RootLayout } from "@/app/layouts/root-layout";
import { RequireAuth, RequireRole } from "@/app/route-guards";
import { Spinner } from "@/components/ui/shadcn-io/spinner";

const LoginPage = lazy(
  () => import("@/features/authentication/pages/login-page")
);
const SignupPage = lazy(
  () => import("@/features/authentication/pages/signup-page")
);
const ForgotPasswordPage = lazy(
  () => import("@/features/authentication/pages/forgot-password-page")
);
const ResetPasswordPage = lazy(
  () => import("@/features/authentication/pages/reset-password-page")
);

const AdminLayout = lazy(() => import("@/app/layouts/admin-layout"));
const DashboardLayout = lazy(() => import("@/app/layouts/dashboard-layout"));
const TeacherLayout = lazy(() => import("@/app/layouts/teacher-layout"));
const StudentLayout = lazy(() => import("@/app/layouts/student-layout"));

const DashboardRedirect = lazy(() => import("@/app/routes/dashboard/page"));

const AdminDashboard = lazy(() => import("@/app/routes/admin/dashboard/page"));
const AdminBulkSignups = lazy(
  () => import("@/app/routes/admin/bulk-signups/page")
);
const AdminModeration = lazy(() => import("@/app/routes/admin/moderation/page"));
const AdminProblemConstraints = lazy(
  () => import("@/app/routes/admin/problem-constraints/page")
);
const AdminProblemEditor = lazy(
  () => import("@/app/routes/admin/problem-editor/page")
);
const AdminProblemVisibility = lazy(
  () => import("@/app/routes/admin/problem-visibility/page")
);
const AdminRuntimeAnalyzer = lazy(
  () => import("@/app/routes/admin/runtime-analyzer/page")
);
const AdminProblemRuntimeAnalyzer = lazy(
  () => import("@/app/routes/admin/problems/[problemId]/runtime-analyzer/page")
);
const AdminSingleSignUp = lazy(
  () => import("@/app/routes/admin/single-sign-up/page")
);
const AdminSmallAdditions = lazy(
  () => import("@/app/routes/admin/small-additions/page")
);
const AdminUploadDriverCode = lazy(
  () => import("@/app/routes/admin/upload-driver-code/page")
);

const StudentDashboard = lazy(
  () => import("@/app/routes/dashboard/student/page")
);
const StudentClasses = lazy(
  () => import("@/app/routes/dashboard/student/classes/page")
);
const StudentGroup = lazy(
  () => import("@/app/routes/dashboard/student/group/[id]/page")
);
const StudentLabs = lazy(
  () => import("@/app/routes/dashboard/student/labs/page")
);
const StudentLab = lazy(
  () => import("@/app/routes/dashboard/student/labs/[id]/page")
);
const StudentModule = lazy(
  () => import("@/app/routes/dashboard/student/modules/[moduleId]/page")
);
const StudentNotifications = lazy(
  () => import("@/app/routes/dashboard/student/notifications/page")
);
const StudentProblemList = lazy(
  () => import("@/app/routes/dashboard/student/problem-list/page")
);
const StudentProblems = lazy(
  () => import("@/app/routes/dashboard/student/problems/page")
);
const StudentResult = lazy(
  () => import("@/app/routes/dashboard/student/results/[result-id]/page")
);
const StudentResultAi = lazy(
  () =>
    import("@/app/routes/dashboard/student/results/[result-id]/ai-results/page")
);

const TeacherDashboard = lazy(
  () => import("@/app/routes/dashboard/teacher/page")
);
const TeacherAnalytics = lazy(
  () => import("@/app/routes/dashboard/teacher/analytics/page")
);
const TeacherAnnouncements = lazy(
  () => import("@/app/routes/dashboard/teacher/announcements/page")
);
const TeacherLabs = lazy(
  () => import("@/app/routes/dashboard/teacher/labs/page")
);
const TeacherLabCreate = lazy(
  () => import("@/app/routes/dashboard/teacher/labs/create/page")
);
const TeacherLab = lazy(
  () => import("@/app/routes/dashboard/teacher/labs/[labId]/page")
);
const TeacherLabAnalytics = lazy(
  () => import("@/app/routes/dashboard/teacher/labs/[labId]/analytics/page")
);
const TeacherMarketplace = lazy(
  () => import("@/app/routes/dashboard/teacher/marketplace/page")
);
const TeacherMarketplacePreview = lazy(
  () =>
    import("@/app/routes/dashboard/teacher/marketplace/[labId]/preview/page")
);
const TeacherModulesCreate = lazy(
  () => import("@/app/routes/dashboard/teacher/modules/create/page")
);
const TeacherModule = lazy(
  () => import("@/app/routes/dashboard/teacher/modules/[moduleId]/page")
);
const TeacherMyProblems = lazy(
  () => import("@/app/routes/dashboard/teacher/my-problems/page")
);
const TeacherMyProblemCreate = lazy(
  () => import("@/app/routes/dashboard/teacher/my-problems/create/page")
);
const TeacherMyProblemEdit = lazy(
  () => import("@/app/routes/dashboard/teacher/my-problems/[id]/edit/page")
);
const TeacherProblems = lazy(
  () => import("@/app/routes/dashboard/teacher/problems/page")
);
const TeacherProfile = lazy(
  () => import("@/app/routes/dashboard/teacher/profile/page")
);
const TeacherStudents = lazy(
  () => import("@/app/routes/dashboard/teacher/students/page")
);
const TeacherCreateGroup = lazy(
  () => import("@/app/routes/dashboard/teacher/students/create-group/page")
);
const TeacherGroup = lazy(
  () => import("@/app/routes/dashboard/teacher/students/group/[id]/page")
);
const TeacherGroupAnalytics = lazy(
  () =>
    import(
      "@/app/routes/dashboard/teacher/students/group/[id]/analytics/page"
    )
);
const TeacherTests = lazy(
  () => import("@/app/routes/dashboard/teacher/tests/page")
);
const TeacherTestEdit = lazy(
  () => import("@/app/routes/dashboard/teacher/tests/edit/[exam-id]/page")
);
const TeacherTestResult = lazy(
  () => import("@/app/routes/dashboard/teacher/tests/results/[result-id]/page")
);
const TeacherTestResultAi = lazy(
  () =>
    import(
      "@/app/routes/dashboard/teacher/tests/results/[result-id]/ai-results/page"
    )
);

const ProblemsPage = lazy(() => import("@/app/routes/problems/page"));
const ProblemListPage = lazy(
  () => import("@/app/routes/problem-list/page")
);
const TestStartPage = lazy(
  () => import("@/app/routes/tests/start/[exam-id]/page")
);
const TestAttemptPage = lazy(
  () => import("@/app/routes/tests/attempt/[exam-id]/page")
);

function PageLoader() {
  return (
    <div className="flex h-full min-h-[60vh] w-full items-center justify-center">
      <Spinner variant="ring" size={40} />
    </div>
  );
}

/** Preserves the `redirects()` contract from next.config.ts. */
function LegacyRedirect({ to }: { to: string }) {
  const params = useReactRouterParams();
  const target = to.replace(/:([\w-]+)/g, (_match, key: string) =>
    encodeURIComponent(params[key] ?? "")
  );
  return <Navigate to={target} replace />;
}

function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-background text-center">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="text-muted-foreground">
        The page you are looking for does not exist.
      </p>
      <a href="/" className="text-sm underline underline-offset-4">
        Go home
      </a>
    </div>
  );
}

export function AppRouter() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<RootLayout />}>
          {/* Public / authentication */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/problems" element={<ProblemsPage />} />
          <Route path="/problem-list" element={<ProblemListPage />} />

          {/* Protected application */}
          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<DashboardRedirect />} />

            <Route element={<DashboardLayout />}>
              <Route element={<RequireRole role="role_org_teacher" />}>
                <Route path="/dashboard/teacher" element={<TeacherLayout />}>
                  <Route index element={<TeacherDashboard />} />
                  <Route
                    path="analytics"
                    element={<TeacherAnalytics />}
                  />
                  <Route
                    path="announcements"
                    element={<TeacherAnnouncements />}
                  />
                  <Route path="labs" element={<TeacherLabs />} />
                  <Route path="labs/create" element={<TeacherLabCreate />} />
                  <Route path="labs/:labId" element={<TeacherLab />} />
                  <Route
                    path="labs/:labId/analytics"
                    element={<TeacherLabAnalytics />}
                  />
                  <Route
                    path="marketplace"
                    element={<TeacherMarketplace />}
                  />
                  <Route
                    path="marketplace/:labId/preview"
                    element={<TeacherMarketplacePreview />}
                  />
                  <Route
                    path="modules/create"
                    element={<TeacherModulesCreate />}
                  />
                  <Route
                    path="modules/:moduleId"
                    element={<TeacherModule />}
                  />
                  <Route
                    path="my-problems"
                    element={<TeacherMyProblems />}
                  />
                  <Route
                    path="my-problems/create"
                    element={<TeacherMyProblemCreate />}
                  />
                  <Route
                    path="my-problems/:id/edit"
                    element={<TeacherMyProblemEdit />}
                  />
                  <Route path="problems" element={<TeacherProblems />} />
                  <Route path="profile" element={<TeacherProfile />} />
                  <Route path="students" element={<TeacherStudents />} />
                  <Route
                    path="students/create-group"
                    element={<TeacherCreateGroup />}
                  />
                  <Route
                    path="students/group/:id"
                    element={<TeacherGroup />}
                  />
                  <Route
                    path="students/group/:id/analytics"
                    element={<TeacherGroupAnalytics />}
                  />
                  <Route path="tests" element={<TeacherTests />} />
                  <Route
                    path="tests/edit/:exam-id"
                    element={<TeacherTestEdit />}
                  />
                  <Route
                    path="tests/results/:result-id"
                    element={<TeacherTestResult />}
                  />
                  <Route
                    path="tests/results/:result-id/ai-results"
                    element={<TeacherTestResultAi />}
                  />
                </Route>
              </Route>

              <Route element={<RequireRole role="role_org_student" />}>
                <Route path="/dashboard/student" element={<StudentLayout />}>
                  <Route index element={<StudentDashboard />} />
                  <Route path="classes" element={<StudentClasses />} />
                  <Route path="group/:id" element={<StudentGroup />} />
                  <Route path="labs" element={<StudentLabs />} />
                  <Route path="labs/:id" element={<StudentLab />} />
                  <Route
                    path="modules/:moduleId"
                    element={<StudentModule />}
                  />
                  <Route
                    path="notifications"
                    element={<StudentNotifications />}
                  />
                  <Route
                    path="problem-list"
                    element={<StudentProblemList />}
                  />
                  <Route path="problems" element={<StudentProblems />} />
                  <Route
                    path="results/:result-id"
                    element={<StudentResult />}
                  />
                  <Route
                    path="results/:result-id/ai-results"
                    element={<StudentResultAi />}
                  />
                </Route>
              </Route>
            </Route>

            <Route element={<RequireRole role="role_platform_admin" />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="bulk-signups" element={<AdminBulkSignups />} />
                <Route path="moderation" element={<AdminModeration />} />
                <Route
                  path="problem-constraints"
                  element={<AdminProblemConstraints />}
                />
                <Route
                  path="problem-editor"
                  element={<AdminProblemEditor />}
                />
                <Route
                  path="problem-visibility"
                  element={<AdminProblemVisibility />}
                />
                <Route
                  path="runtime-analyzer"
                  element={<AdminRuntimeAnalyzer />}
                />
                <Route
                  path="problems/:problemId/runtime-analyzer"
                  element={<AdminProblemRuntimeAnalyzer />}
                />
                <Route
                  path="single-sign-up"
                  element={<AdminSingleSignUp />}
                />
                <Route
                  path="small-additions"
                  element={<AdminSmallAdditions />}
                />
                <Route
                  path="upload-driver-code"
                  element={<AdminUploadDriverCode />}
                />
              </Route>
            </Route>

            <Route
              path="/tests/start/:exam-id"
              element={<TestStartPage />}
            />
            <Route
              path="/tests/attempt/:exam-id"
              element={<TestAttemptPage />}
            />
          </Route>

          {/* Legacy URLs kept alive from next.config.ts redirects */}
          <Route
            path="/admin/bulkSignUp"
            element={<LegacyRedirect to="/admin/bulk-signups" />}
          />
          <Route
            path="/admin/uploaddrivercode"
            element={<LegacyRedirect to="/admin/upload-driver-code" />}
          />
          <Route
            path="/admin/uploadcomplexitycases"
            element={<LegacyRedirect to="/admin/upload-complexity-cases" />}
          />
          <Route
            path="/admin/uploadComplexityGenerator"
            element={<LegacyRedirect to="/admin/upload-complexity-generator" />}
          />
          <Route
            path="/dashboard/student/problemlist"
            element={<LegacyRedirect to="/dashboard/student/problem-list" />}
          />
          <Route
            path="/dashboard/student/seeresults/:id"
            element={<LegacyRedirect to="/dashboard/student/results/:id" />}
          />
          <Route
            path="/dashboard/student/seeresults/:id/airesults"
            element={
              <LegacyRedirect to="/dashboard/student/results/:id/ai-results" />
            }
          />
          <Route
            path="/dashboard/teacher/students/creategroup"
            element={
              <LegacyRedirect to="/dashboard/teacher/students/create-group" />
            }
          />
          <Route
            path="/dashboard/teacher/test/edit/:id"
            element={<LegacyRedirect to="/dashboard/teacher/tests/edit/:id" />}
          />
          <Route
            path="/dashboard/teacher/test/seeresults/:id"
            element={<LegacyRedirect to="/dashboard/teacher/tests/results/:id" />}
          />
          <Route
            path="/dashboard/teacher/test/seeresults/:id/airesults"
            element={
              <LegacyRedirect to="/dashboard/teacher/tests/results/:id/ai-results" />
            }
          />
          <Route
            path="/test/starttest/:id"
            element={<LegacyRedirect to="/tests/start/:id" />}
          />
          <Route
            path="/test/givetest/:id"
            element={<LegacyRedirect to="/tests/attempt/:id" />}
          />
          <Route
            path="/problemlist"
            element={<LegacyRedirect to="/problem-list" />}
          />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default AppRouter;
