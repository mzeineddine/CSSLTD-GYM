const Custom_Header = (scheduler) => {
  const { state, handleState } = scheduler;
  return (
    <div>
      {/* Left section: Navigation */}
      <div style={{ display: "flex", gap: "10px" }}>
        <Button
          variant="outlined"
          color="blue"
          onClick={() => handleState({ ...state, date: new Date() })}
          startIcon={<Today />}
        >
          Today
        </Button>
        <div style={{ display: "flex" }}>
          <IconButton onClick={() => scheduler.prev()}>
            <ChevronLeft />
          </IconButton>
          <IconButton onClick={() => scheduler.next()}>
            <ChevronRight />
          </IconButton>
        </div>
        <h3 style={{ margin: "0 15px" }}>
          {/* Display current date/month/year */}
          {new Date(state.date).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
            day: state.view === "day" ? "numeric" : undefined,
          })}
        </h3>
      </div>
      {/* Middle section: View selection */}
      <div style={{ display: "flex", gap: "10px" }}>
        <Button
          variant={state.view === "day" ? "contained" : "outlined"}
          onClick={() => handleState({ ...state, view: "day" })}
          startIcon={<ViewDay />}
        >
          Day
        </Button>
        <Button
          variant={state.view === "week" ? "contained" : "outlined"}
          onClick={() => handleState({ ...state, view: "week" })}
          startIcon={<ViewWeek />}
        >
          Week
        </Button>
        <Button
          variant={state.view === "month" ? "contained" : "outlined"}
          onClick={() => handleState({ ...state, view: "month" })}
          startIcon={<ViewMonth />}
        >
          Month
        </Button>
      </div>
      {/* Right section: Add new event button */}
      <Button
        variant="contained"
        color="primary"
        onClick={() =>
          scheduler.handleState({
            ...scheduler.state,
            dialog: {
              ...scheduler.state.dialog,
              open: true,
              type: "create",
            },
          })
        }
        startIcon={<Add />}
      >
        Add Appointment
      </Button>
    </div>
  );
};
export default Custom_Header;
