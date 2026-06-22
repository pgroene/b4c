/**
 * Router — all 20 B4C-SCR routes wired to screen components.
 * Routes match screen_register_B4C_SCR_001_020.csv exactly.
 *
 * @requirement *
 * @scope router
 */
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { SCR001_Login } from './screens/SCR001_Login'
import { SCR002_Workspaces } from './screens/SCR002_Workspaces'
import { SCR003_CustomerOverview } from './screens/SCR003_CustomerOverview'
import { SCR004_ProjectOverview } from './screens/SCR004_ProjectOverview'
import { SCR005_ProjectDashboard } from './screens/SCR005_ProjectDashboard'
import { SCR006_Classification } from './screens/SCR006_Classification'
import { SCR007_Intake } from './screens/SCR007_Intake'
import { SCR008_Sources } from './screens/SCR008_Sources'
import { SCR009_Questions } from './screens/SCR009_Questions'
import { SCR010_Requirements } from './screens/SCR010_Requirements'
import { SCR011_UseCases } from './screens/SCR011_UseCases'
import { SCR012_Traceability } from './screens/SCR012_Traceability'
import { SCR013_LFV } from './screens/SCR013_LFV'
import { SCR014_Documents } from './screens/SCR014_Documents'
import { SCR015_PrototypeBriefing } from './screens/SCR015_PrototypeBriefing'
import { SCR016_Readiness } from './screens/SCR016_Readiness'
import { SCR017_Settings } from './screens/SCR017_Settings'
import { SCR018_AIRunPanel } from './screens/SCR018_AIRunPanel'
import { SCR019_KnowledgeVault } from './screens/SCR019_KnowledgeVault'
import { SCR020_Handover } from './screens/SCR020_Handover'

export const router = createBrowserRouter([
  { path: '/',                                    element: <Navigate to="/login" replace /> },
  { path: '/login',                               element: <SCR001_Login /> },
  { path: '/workspaces',                          element: <SCR002_Workspaces /> },
  { path: '/customers/ngk-beverwijk',             element: <SCR003_CustomerOverview /> },
  { path: '/projects',                            element: <SCR004_ProjectOverview /> },
  { path: '/projects/kapp/dashboard',             element: <SCR005_ProjectDashboard /> },
  { path: '/projects/kapp/classification',        element: <SCR006_Classification /> },
  { path: '/projects/kapp/intake',                element: <SCR007_Intake /> },
  { path: '/projects/kapp/sources',               element: <SCR008_Sources /> },
  { path: '/projects/kapp/questions',             element: <SCR009_Questions /> },
  { path: '/projects/kapp/requirements',          element: <SCR010_Requirements /> },
  { path: '/projects/kapp/use-cases',             element: <SCR011_UseCases /> },
  { path: '/projects/kapp/traceability',          element: <SCR012_Traceability /> },
  { path: '/projects/kapp/lfv',                   element: <SCR013_LFV /> },
  { path: '/projects/kapp/documents',             element: <SCR014_Documents /> },
  { path: '/projects/kapp/prototype-briefing',    element: <SCR015_PrototypeBriefing /> },
  { path: '/projects/kapp/readiness',             element: <SCR016_Readiness /> },
  { path: '/projects/kapp/settings',              element: <SCR017_Settings /> },
  { path: '/projects/kapp/ai-run',                element: <SCR018_AIRunPanel /> },
  { path: '/projects/kapp/knowledge-vault',       element: <SCR019_KnowledgeVault /> },
  { path: '/projects/kapp/handover',              element: <SCR020_Handover /> },
])
