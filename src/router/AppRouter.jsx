import { Route, Routes } from "react-router-dom"
import { OtherComponent } from "../modules/users/components/OtherComponent"
import { ListUsers } from "../modules/users/components/ListUsers"

export const AppRouter = () => {
  return (
    <>
        <Routes>
            <Route path="/*" element={<ListUsers />} />
            <Route path="/other" element={<OtherComponent />} />
        </Routes>
    </>
  )
}
