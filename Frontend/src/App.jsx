import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NoSidebarLayout from "./components/NoSideBarLayout";
import WithSidebarLayout from "./components/WithSideBarLayout";
import Member from "./pages/Member";
import Staff from "./pages/Staff";
import Coach from "./pages/Coach";
import CalendarComponent from "./components/Calendar";
import Appointment_Calendar from "./pages/Appointmnet_Calendar";
import Expense from "./pages/Expense";
import { Members_Provider } from "./context/Members_Context";
import { Staffs_Provider } from "./context/Staffs_Context";
import { Coaches_Provider } from "./context/Coaches_Context";
import { Expenses_Provider } from "./context/Expenses_Context";
import { PaymentAccounts_Provider } from "./context/PaymentAccounts_Context";
import { ExpensePayments_Provider } from "./context/ExpensePayments_Context";
import Expense_Payment from "./components/Expense_Payment";

function App() {
  return (
    <Members_Provider>
      <Staffs_Provider>
        <Coaches_Provider>
          <Expenses_Provider>
            <PaymentAccounts_Provider>
              <ExpensePayments_Provider>
                <Routes>
                  <Route element={<NoSidebarLayout />}>
                    <Route path="/" element={<Login />} />
                  </Route>
                  <Route element={<WithSidebarLayout />}>
                    <Route path="/home" element={<Dashboard />} />
                    <Route path="/member" element={<Member />} />
                    <Route path="/staff" element={<Staff />} />
                    <Route path="/coach" element={<Coach />} />
                    <Route path="/calendar" element={<Appointment_Calendar />} />
                    {/* <Route path="/balance" element={<Balance />} /> */}
                    <Route path="/expense" element={<Expense />} />
                    <Route path="/expense_payments" element={<Expense_Payment />} />
                    {/* <Route path="/settings" element={<Settings />} /> */}
                    {/* <Route path="/logout" element={<Logout />} /> */}
                    {/* <Route path="/profile" element={<Profile />} /> */}
                  </Route>
                </Routes>
              </ExpensePayments_Provider>
            </PaymentAccounts_Provider>
          </Expenses_Provider>
        </Coaches_Provider>
      </Staffs_Provider>
    </Members_Provider>
  );
}

export default App;
