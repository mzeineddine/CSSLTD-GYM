import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Box, Typography, Stack } from "@mui/material";
import { useEffect, useRef, useState } from "react";

// Center label inside the Pie
const CustomLabel = ({ total, currency }) => (
  <Box textAlign="center">
    <Typography variant="caption" color="textSecondary">
      Total Planned
    </Typography>
    <Typography variant="h6" fontWeight="bold">
      {total.toFixed(2)} {currency}
    </Typography>
  </Box>
);

const BillingOverviewChart = ({
  data = [],
  title = "Billing Overview",
  currency = "USD",
}) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  const chartContainerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      if (chartContainerRef.current) {
        const width = chartContainerRef.current.offsetWidth;
        setDimensions({
          width,
          height: width, // height = width for 1:1 ratio
        });
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div className="pichart">
      <Box width="auto" mx="auto">
        <Typography variant="subtitle1" fontWeight="bold" mb={2}>
          {title}
        </Typography>
        <Box
          ref={chartContainerRef}
          position="relative"
          width="100%"
          height={dimensions.height}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius="75%"
                outerRadius="100%"
                paddingAngle={2}
                startAngle={90}
                endAngle={-270}
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => `${value.toFixed(2)} ${currency}`}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* Center Label */}
          <Box
            position="absolute"
            top="50%"
            left="50%"
            sx={{ transform: "translate(-50%, -50%)" }}
          >
            <CustomLabel total={total} currency={currency} />
          </Box>
        </Box>
        {/* Legend */}
        <Stack
          direction="row"
          justifyContent="center"
          spacing={4}
          mt={2}
          flexWrap="wrap"
        >
          {data.map((item, idx) => (
            <Box key={idx} display="flex" alignItems="center" mb={1}>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  bgcolor: item.color,
                  borderRadius: "50%",
                  mr: 1,
                }}
              />
              <Typography variant="body2">
                {item.name.toUpperCase()}: {item.value.toFixed(2)} {currency}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>
    </div>
  );
};

export default BillingOverviewChart;
