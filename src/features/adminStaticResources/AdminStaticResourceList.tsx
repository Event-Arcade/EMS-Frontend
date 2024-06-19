import { Accordion, Button, Form } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useState } from "react";
import { adminStaticResourceDelete, adminStaticResourceUpdate } from "./AdminStaticResourceSlice";

export default function AdminStaticResourceList() {
    const { staticResources } = useAppSelector((state) => state.adminStaticResource);
    const dispatch = useAppDispatch();
    const [editingResourceId, setEditingResourceId] = useState<number | null>(
      null
    );
    const [editedName, setEditedName] = useState("");
    const [editedDescription, setEditedDescription] = useState("");
    const [editedFile, setEditedFile] = useState<File | null>();

    const handleSaveClick = () => {
      // Save the edited category
      setEditingResourceId(null);
      var formData = new FormData();
      formData.append("name", editedName);
      formData.append("description", editedDescription);
      if (editedFile) {
        formData.append("image", editedFile);
      }
      dispatch(adminStaticResourceUpdate({ id: editingResourceId || 0, data: formData }));
  };

  const handleCancelClick = () => {
      setEditingResourceId(null);
  };

  const handleDeleteClick = (id: number) => {
    dispatch(adminStaticResourceDelete(id));
  };
  
    return (
      <div>
         <hr
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "150%",
        }}
      ></hr>
      <h3 style={{ padding: "40px 0px 20px 0", color: "#BDBDBD" }}>
        Existing Static Resources
      </h3>
      <Accordion>
        {staticResources.map((resource) => (
          <Accordion.Item eventKey={String(resource.id)} key={resource.id}>
            <Accordion.Header>{resource.name}</Accordion.Header>
            <Accordion.Body>
              {editingResourceId === resource.id ? (
                <Form>
                  <Form.Group controlId="editedName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="editedDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="editedCategoryImage">
                    <Form.Label>Category Image</Form.Label>
                    <Form.Control
                      type="file"
                      value={editedFile ? URL.createObjectURL(editedFile) : ""}
                      onChange={(e) => setEditedFile((e.target as HTMLInputElement).files?.[0])}
                    />
                  </Form.Group>

                  <Button
                    style={{ width: "100px", margin: "20px" }}
                    variant="warning"
                    onClick={handleSaveClick}
                  >
                    Save
                  </Button>
                  <Button
                    style={{ width: "100px" }}
                    variant="outline-danger"
                    onClick={handleCancelClick}
                  >
                    Cancel
                  </Button>
                </Form>
              ) : (
                <>
                  <p>Name: {resource.name}</p>
                  <p>Description: {resource.description}</p>
                  <img
                    src={resource.resourceUrl}
                    alt={resource.name}
                    style={{ width: "100px", height: "100px" }}
                  />
                  <div>
                    <Button
                      style={{ width: "100px", marginTop: "20px"}}
                      variant="success"
                      onClick={() => {
                        if (resource.id) {
                          setEditingResourceId(resource.id);
                          setEditedName(resource.name);
                          setEditedDescription(resource.description || "");
                        }
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      style={{ width: "100px", marginTop: "20px" }}
                      variant="danger"
                      onClick={() => handleDeleteClick(resource.id ?? 0)}
                    >
                      Delete
                    </Button>
                  </div>
                </>
              )}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>

    );
  };
  