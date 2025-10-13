import { users } from "../../mock/UserMockData";
import Table from "../../composites/table/Table";
import PageTitle from "../../components/pageTitle/PageTitle";
import styles from "../../styles/PageStyles.module.scss";
import useUserStore from "../../store/userStore/UserStore";
import ManageDetails from "../../composites/manage/ManageDetails";
import { useState } from "react";
import { defaultUserValues } from "../../models/defaults/defaultUserValues";
import { userColumns } from "../../models/columnDefinitions/entities/userColumns";

const UserPage = () => {
  const { isEdit, setIsEdit, setSelectedUserId, setSelectedUser } =
    useUserStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseDialog = () => {
    setIsOpen(false);
    setIsEdit(false);
    setSelectedUserId(null);
    setSelectedUser(defaultUserValues);
  };

  const handleSaveUser = () => {
    if (isEdit) {
      // Save user logic here
    } else {
      // Create new user logic here
    }
  };

  return (
    <div className={styles["wrapper"]}>
      <div className={styles["page-items"]}>
        <PageTitle
          page="Korisnici"
          isAddNewAvailable={true}
          setIsOpen={setIsOpen}
        />
        <div
          className={`${styles["content-wrapper"]} ${
            isEdit ? styles["is-edit"] : ""
          }`}
        >
          <div className={styles["table"]}>
            <Table
              columnDefinitions={userColumns(setIsOpen)}
              entityList={users}
            />
          </div>
          <ManageDetails
            content="user"
            name="Korisnik"
            isOpen={isOpen}
            onClose={handleCloseDialog}
            onSave={handleSaveUser}
          />
        </div>
      </div>
    </div>
  );
};

export default UserPage;
