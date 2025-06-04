import { useLocation } from "react-router-dom";
import Graph from "../../components/Graph";
import PiChart from "../../components/PiChart";
import { useContext, useEffect, useState, useMemo } from "react";
import Edit_Popup from "../../components/Edit_Popup";
import { Members_Context } from "../../context/Members_Context";
import { Grid, Typography, Box, Avatar } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import CakeIcon from "@mui/icons-material/Cake";
import EventNoteIcon from "@mui/icons-material/EventNote";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PaidIcon from "@mui/icons-material/Paid";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import BillingOverviewChart from "../../components/PiChart/piChart";
import { Accesses_Context } from "../../context/Access_Context";
import { Categories_Context } from "../../context/Categories_Context";
import Table1 from "../../components/Table/tables";
import Page_Title_Add from "../../components/Page_Title_Add";

const Member_Profile = () => {
  const location = useLocation();
  // const data = location.state;

  const { accesses, update_accesses } = useContext(Accesses_Context);
  const { categories, update_categories } = useContext(Categories_Context);

  const [access, setAccess] = useState(null);
  if (!accesses) update_accesses();
  if (!categories) update_categories();

  useEffect(() => {
    if (!accesses) return;
    if (!categories) return;

    const newAccess = {
      create: false,
      view: false,
      edit: false,
      delete: false,
    };

    accesses.forEach((acc) => {
      if (acc.page == "subscription") {
        if (acc.action == "1") newAccess.create = true;
        if (acc.action == "2") newAccess.view = true;
        if (acc.action == "3") newAccess.edit = true;
        if (acc.action == "4") newAccess.delete = true;
      }
    });
    setAccess(newAccess);
  }, [accesses, categories]);
  const [id, setId] = useState(location.state);
  const [showEdit, setShowEdit] = useState(false);
  const { members, update_members } = useContext(Members_Context);
  const [member, setMember] = useState(null);
  useEffect(() => {
    setId(location.state);
  }, [location]);
  useEffect(() => {
    if (!members) {
      update_members();
      return;
    }
    const found = members.find((m) => m.id == id);
    if (found) setMember(found);
  }, [members, id]);

  const data = useMemo(() => {
    if (!member) return [];
    console.log(Object.keys(member));
    return [
      {
        icon: <PersonIcon color="secondary" />,
        label: "full_name",
        value: member.full_name || "N/A",
      },
      {
        icon: <PhoneIcon color="secondary" />,
        label: "contact",
        value: member.contact || "N/A",
      },
      {
        icon: <CakeIcon color="secondary" />,
        label: "dob",
        value: member.dob || "N/A",
      },
      {
        icon: <PaidIcon color="secondary" />,
        label: "paid_amount",
        value: member.paid_amount || "N/A",
      },
      {
        icon: <EventNoteIcon color="secondary" />,
        label: "remaining_amount",
        value: member.remaining_amount || "N/A",
      },
      {
        icon: <ReceiptLongIcon color="secondary" />,
        label: "total_amount",
        value: member.total_amount || "N/A",
      },
    ];
  }, [member]);

  const chartData = useMemo(() => {
    return [
      { name: "paid", value: member?.paid_amount || 0, color: "green" },
      {
        name: "remaining",
        value: member?.remaining_amount || 0,
        color: "yellow",
      },
    ];
  }, [member]);

  return (
    <div className="member_profile">
      <div className="title flex flex-row justify-between items-center m-[2%]">
        <h1 className="font-bold w-full text-left text-3xl my-1">
          Member Profile
        </h1>
        <button
          className="w-auto whitespace-nowrap"
          onClick={() => setShowEdit(true)}
        >
          Edit Member
        </button>
        {member && showEdit && (
          <Edit_Popup
            open={showEdit}
            onClose={() => setShowEdit(false)}
            name={"member"}
            fields={{
              full_name: "text",
              contact: "text",
              address: "text",
              dob: "date",
            }}
            filled_field={member}
          />
        )}
      </div>
      <div className="member-info bg-gray-50 rounded-2xl p-2 flex flex-row flex-wrap justify-around m-[2%] w-[96%]">
        <Box display="flex" flexWrap="wrap" width={"30%"} gap={1}>
          {data.map((item, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent="start"
              alignItems="center"
              width="48%"
              gap={1}
            >
              <Avatar sx={{ bgcolor: "transparent", color: "#6c63ff" }}>
                {item.icon}
              </Avatar>
              <Box>
                <Typography variant="caption" color="secondary">
                  {item.label}
                </Typography>
                <Typography variant="subtitle1" fontWeight="bold">
                  {item.value}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
        <div className="graphs">
          <BillingOverviewChart
            data={chartData}
            title="Patient Billing Overview"
            currency="USD"
          />
        </div>
        {/* {console.log(member?.id)} */}
        {member && (
          <div className="expense_payment m-[2%]">
            {access?.create && (
              <Page_Title_Add
                name="subscription"
                options={
                  categories && {
                    category_id: categories,
                  }
                }

                data={{ id: member?.id }}
                id_change={"member_id"}
                fields={{
                  category_id: "dropdown",
                  start_date: "date",
                  end_date: "date",
                  cost: "number",
                }}
              />
            )}
            {access?.view && (
              <Table1
                title="subscription"
                options={
                  access?.edit && [{ "Edit Subscription": "edit_subscription" }]
                }
                options_names={{
                  edit_subscription: "subscription",
                }}
                select_options={{
                  category_id: categories,
                }}
                options_functions_field={{
                  edit_subscription: {
                    category_id: "dropdown",
                    start_date: "date",
                    end_date: "date",
                    cost: "number",
                  },
                }}
                member_id={member?.id}
                info={false}
                searchable={true}
                paging={true}
                exportable={true}
                visible={false}
                selectable={access.delete ? "multiple" : "none"}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Member_Profile;
