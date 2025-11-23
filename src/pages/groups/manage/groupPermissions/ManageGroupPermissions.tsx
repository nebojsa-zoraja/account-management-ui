import { Box, Typography, Alert } from "@mui/material";
import GroupRoleTable from "./roleTable/GroupRoleTable";
import styles from "./ManageGroupPermissions.module.scss";

const ManageGroupPermissions = () => {
  return (
    <Box className={styles["container"]}>
      <Box>
        <Alert severity="info" className={styles["info-alert"]}>
          Izaberite uloge koje će biti dodeljene ovoj grupi. Svi korisnici u
          grupi će dobiti ove uloge.
        </Alert>

        <Typography variant="h6" gutterBottom className={styles["section-title"]}>
          Uloge
        </Typography>
        <Box>
          <GroupRoleTable />
        </Box>
      </Box>
    </Box>
  );
};

export default ManageGroupPermissions;
