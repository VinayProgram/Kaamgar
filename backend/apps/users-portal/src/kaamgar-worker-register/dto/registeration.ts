import { schemaTables } from "../../common/importHelpers"

export type kaamgarRegisterDTO =typeof schemaTables.users_login.kaamgarUsers.$inferInsert

export type PartialKaamgarDTO = Partial<kaamgarRegisterDTO>