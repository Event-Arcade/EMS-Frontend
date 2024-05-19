import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Accordion, Button, Form } from "react-bootstrap";
import { categoryDelete, categoryUpdate } from "./CategorySlice";


export default function CategoryList() {
  const dispatch = useAppDispatch();
    const {categories} = useAppSelector((state) => state.category)
    const [editedCategoryId, setEditedCategoryId] = useState<number | null>(null);  
    const [editedName, setEditedName] = useState("");
    const [editedDescription, setEditedDescription] = useState("");
    const [editedCategoryImage, setEditedCategoryImage] = useState<File| null>();

    const handleSaveClick = () => {
        // Save the edited category
        setEditedCategoryId(null);
        var formData = new FormData();
        formData.append("name", editedName);
        formData.append("description", editedDescription);
        if (editedCategoryImage) {
          formData.append("image", editedCategoryImage);
        }
        dispatch(categoryUpdate({ id: editedCategoryId || 0, data: formData }));
    };

    const handleCancelClick = () => {
        setEditedCategoryId(null);
    };

    const handleDeleteClick = (id: number) => {
      dispatch(categoryDelete(id));
    };
    return (
      <div>
        <h2
          style={{
            padding: "40px 0 0 0",
            color: "#B0BEC5",
            fontSize: "40px",
            textAlign: "center",
          }}
        >
          Category Section
        </h2>
        <hr
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></hr>
        <h3 style={{ padding: "40px 0px 20px 0", color: "#BDBDBD" }}>
          Existing Categories
        </h3>
        <Accordion>
          {categories.map((category) => (
            <Accordion.Item eventKey={String(category.id)} key={category.id}>
              <Accordion.Header>{category.name}</Accordion.Header>
              <Accordion.Body>
                {editedCategoryId === category.id ? (
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
                        value={editedCategoryImage ? URL.createObjectURL(editedCategoryImage) : ""}
                        onChange={(e) => setEditedCategoryImage((e.target as HTMLInputElement).files?.[0])}
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
                    <p>Name: {category.name}</p>
                    <p>Description: {category.description}</p>
                    <img
                      src={category.imageUrl}
                      alt={category.name}
                      style={{ width: "100px", height: "100px" }}
                    />
                    <div>
                      <Button
                        style={{ width: "100px", marginTop: "20px" }}
                        variant="success"
                        onClick={() => {
                          if (category.id) {
                            setEditedCategoryId(category.id);
                            setEditedName(category.name);
                            setEditedDescription(category.description);
                          }
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        style={{ width: "100px", marginTop: "20px" }}
                        variant="danger"
                        onClick={() => handleDeleteClick(category.id ?? 0)}
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