import { Box, Button, Divider, Typography } from "@mui/material";
import ImageSlider from "./ImageSlider";
import BedIcon from "@mui/icons-material/Bed";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";

export default function RoomCard({
  id,
  images,
  name,
  type,
  amenities,
  price,
}: {
  id: string;
  images: Array<string>;
  name: string;
  type: string;
  amenities: Array<string>;
  price: number;
}) {
  const params = useParams<{ hotelID: string }>();
  const queryParams = useSearchParams();

  return (
    <Box
      sx={{
        width: 350,
        height: 425,
        border: "1px solid rgba(0, 0, 0, 0.5)",
        borderRadius: "10px",
      }}
    >
      <Box
        height={180}
        borderRadius="10px 10px 0 0"
        overflow="hidden"
        sx={{
          "&:hover .swiper-button-prev, &:hover .swiper-button-next": {
            opacity: 1,
          },
          ".swiper-button-prev, .swiper-button-next": {
            opacity: 0,
            transition: "opacity 0.3s ease",
          },
        }}
      >
        <ImageSlider images={images} />
      </Box>

      <Box p={2}>
        <Box display="flex" flexDirection="column" gap={2}>
          <Typography fontWeight="500" fontSize="large">
            {name}
          </Typography>

          <Box display="flex" alignItems="center">
            <BedIcon fontSize="medium" />
            <Typography>{type}</Typography>
          </Box>

          <Box display="flex" gap={1}>
            {amenities.map((element) => (
              <Typography key={element}>{element}</Typography>
            ))}
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box display="flex" justifyContent="space-between">
          <Box>
            <Typography fontWeight="500" fontSize="large">
              {price} VND
            </Typography>
            <Typography>đã bao gồm thuế</Typography>
          </Box>

          <Box>
            <Button variant="contained" color="primary">
              <Link
                href={`/hotels/book/${
                  params.hotelID
                }/${id}?${queryParams.toString()}`}
              >
                Đặt phòng
              </Link>
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
