import React, { useState } from "react";
import {
  Accordion,
  Form,
  Button,
  ListGroup,
  Modal,
  Card,
} from "react-bootstrap";
import "./adminDashboard.css";
import PageTitle from "../Dashboard/PageTitle";
import Header from "../Dashboard/Header";
import SideBar from "../Dashboard/SideBar";
import Footer from "../../components/Footer/Footer";

interface Category {
  id: number;
  name: string;
  description: string;
  categoryImage: string;
}

const ExistingCategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: 1,
      name: "Category 1",
      description: "This is category 1",
      categoryImage: "https://example.com/category1.jpg",
    },
    {
      id: 2,
      name: "Category 2",
      description: "This is category 2",
      categoryImage: "https://example.com/category2.jpg",
    },
    {
      id: 3,
      name: "Category 3",
      description: "This is category 3",
      categoryImage: "https://example.com/category3.jpg",
    },
  ]);

  const [editedCategoryId, setEditedCategoryId] = useState<number | null>(null);
  const [editedName, setEditedName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedCategoryImage, setEditedCategoryImage] = useState("");

  const handleEditClick = (category: Category) => {
    setEditedCategoryId(category.id);
    setEditedName(category.name);
    setEditedDescription(category.description);
    setEditedCategoryImage(category.categoryImage);
  };

  const handleCancelClick = () => {
    setEditedCategoryId(null);
  };

  const handleSaveClick = () => {
    // Update the category in the categories state
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === editedCategoryId
          ? {
              ...category,
              name: editedName,
              description: editedDescription,
              categoryImage: editedCategoryImage,
            }
          : category
      )
    );
    // Clear the edited category state
    setEditedCategoryId(null);
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
          <Accordion.Item eventKey={category.id.toString()} key={category.id}>
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
                      type="text"
                      value={editedCategoryImage}
                      onChange={(e) => setEditedCategoryImage(e.target.value)}
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
                    src={category.categoryImage}
                    alt={category.name}
                    style={{ width: "100px", height: "100px" }}
                  />
                  <div>
                    <Button
                      style={{ width: "100px", marginTop: "20px" }}
                      variant="success"
                      onClick={() => handleEditClick(category)}
                    >
                      Edit
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

const CreateCategoryForm: React.FC = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryImage, setCategoryImage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 style={{ padding: "40px 0px 20px 0", color: "#BDBDBD" }}>
        Create Category
      </h2>
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="categoryImage">
        <Form.Label>Category Image</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter category image URL"
          value={categoryImage}
          onChange={(e) => setCategoryImage(e.target.value)}
          required
        />
      </Form.Group>

      <Button
        style={{ width: 100, margin: "20px" }}
        variant="warning"
        type="submit"
      >
        Submit
      </Button>
    </Form>
  );
};

interface Resource {
  id: number;
  name: string;
  description: string;
  file: File;
}

interface AddResourceFormProps {
  addResource: (resource: Resource) => void;
}

const AddResourceForm: React.FC<AddResourceFormProps> = ({ addResource }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (file) {
      const newResource: Resource = {
        id: Date.now(),
        name,
        description,
        file,
      };

      addResource(newResource);

      // Reset form fields
      setName("");
      setDescription("");
      setFile(null);
    }
  };

  return (
    <>
      <h2
        style={{
          padding: "40px 0 0 0",
          color: "#B0BEC5",
          fontSize: "40px",
          textAlign: "center",
        }}
      >
        Static Resources
      </h2>
      <hr
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      ></hr>
      <h3 style={{ padding: "40px 0px 20px 0", color: "#BDBDBD" }}>
        Add New Resource
      </h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="file">
          <Form.Label>File</Form.Label>
          <Form.Control
            type="file"
            accept="image/*, video/*, .pdf"
            onChange={(e) =>
              setFile((e.target as HTMLInputElement).files?.[0] || null)
            }
            required
          />
        </Form.Group>
        <Button type="submit" style={{ width: "150px", margin: "20px" }} variant="warning">
          Add Resource
        </Button>
      </Form>
    </>
  );
};

// export default AddResourceForm;

interface DisplayResourcesProps {
  resources: Resource[];
  deleteResource: (id: number) => void;
  editResource: (id: number, name: string, description: string, file?: File) => void;
}

const DisplayResources: React.FC<DisplayResourcesProps> = ({
  resources,
  deleteResource,
  editResource,
}) => {
  const [editingResourceId, setEditingResourceId] = useState<number | null>(null);
  const [editedFile, setEditedFile] = useState<File | null>(null);

  const handleNameChange = (id: number, name: string) => {
    editResource(id, name, "");
  };

  const handleDescriptionChange = (id: number, description: string) => {
    editResource(id, "", description);
  };

  const handleFileChange = (id: number, file: File) => {
    setEditedFile(file);
  };

  const handleEditClick = (id: number) => {
    setEditingResourceId(id);
    setEditedFile(null); // Reset the edited file when starting to edit a resource
  };

  const handleSaveClick = (id: number) => {
    if (editedFile) {
      editResource(id, "", "", editedFile);
    }
    setEditingResourceId(null);
  };

  return (
    <>
      <h3 style={{ padding: "40px 0px 20px 0", color: "#BDBDBD" }}>
        Existing Categories
      </h3>
      <Accordion>
        {resources.map((resource) => (
          <Accordion.Item eventKey={resource.id.toString()} key={resource.id}>
            <Accordion.Header>{resource.name}</Accordion.Header>
            <Accordion.Body>
              {editingResourceId === resource.id ? (
                // Editable form when editing the current resource
                <>
                  <Form>
                    <Form.Group controlId="editName">
                      <Form.Label>Edit Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={resource.name}
                        onChange={(e) =>
                          handleNameChange(resource.id, e.target.value)
                        }
                      />
                    </Form.Group>
                    <Form.Group controlId="editDescription">
                      <Form.Label>Edit Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={resource.description}
                        onChange={(e) =>
                          handleDescriptionChange(resource.id, e.target.value)
                        }
                      />
                    </Form.Group>
                    <Form.Group controlId="editFile">
                      <Form.Label>Edit File</Form.Label>
                      <Form.Control
                        type="file"
                        accept="image/*, video/*, .pdf"
                        onChange={(e) => {
                          const file = (e.target as HTMLInputElement).files?.[0];
                          if (file) {
                            handleFileChange(resource.id, file);
                          }
                        }}
                      />
                    </Form.Group>
                  </Form>
                  <Button
                    style={{ width: "100px", margin: "20px" }}
                    variant="success"
                    onClick={() => handleSaveClick(resource.id)}
                  >
                    Save
                  </Button>
                </>
              ) : (
                // Display resource details
                <>
                  <p>Description: {resource.description}</p>
                  {resource.file.type.startsWith("image/") && (
                    <img
                      src={URL.createObjectURL(resource.file)}
                      alt={resource.name}
                      style={{ maxWidth: "200px", maxHeight: "200px" }}
                    />
                  )}
                  {resource.file.type.startsWith("video/") && (
                    <video
                      controls
                      style={{ maxWidth: "200px", maxHeight: "200px" }}
                    >
                      <source
                        src={URL.createObjectURL(resource.file)}
                        type={resource.file.type}
                      />
                    </video>
                  )}
                  {resource.file.type === "application/pdf" && (
                    <a
                      href={URL.createObjectURL(resource.file)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View PDF
                    </a>
                  )}
                  <br />
                  <Button
                    style={{ width: "100px", margin: "20px" }}
                    variant="warning"
                    onClick={() => handleEditClick(resource.id)}
                  >
                    Edit
                  </Button>
                </>
              )}
              <Button
                style={{ width: "100px", margin: "20px" }}
                variant="danger"
                onClick={() => deleteResource(resource.id)}
              >
                Delete
              </Button>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </>
  );
};

// export default DisplayResources;

const AdminDashboard: React.FC = () => {
  const [isSideBarVisible, setIsSideBarVisible] = useState(true);
  const [resources, setResources] = useState<Resource[]>([]);

  const toggleSideBar = () => {
    setIsSideBarVisible(!isSideBarVisible);
  };

  const addResource = (newResource: Resource) => {
    setResources((prevResources) => [...prevResources, newResource]);
  };

  const deleteResource = (id: number) => {
    setResources((prevResources) => prevResources.filter((r) => r.id !== id));
  };

  const editResource = (id: number, name: string, description: string) => {
    setResources((prevResources) =>
      prevResources.map((r) =>
        r.id === id
          ? {
              ...r,
              name: name || r.name,
              description: description || r.description,
            }
          : r
      )
    );
  };

  return (
    <>
      <Header toggleSideBar={toggleSideBar} />
      <div className="page-content-ad">
        <div></div>
        <div className="col-lg-2">
          <SideBar isVisible={isSideBarVisible} />
        </div>
        <div className="col-lg-8" style={{ margin: "100px 40px 40px 70px" }}>
          <PageTitle page="Admin Dashboard" />
          <ExistingCategoryList />
          <CreateCategoryForm />
          {/* <ResourceList /> */}
          <AddResourceForm addResource={addResource} />
          <DisplayResources
            resources={resources}
            deleteResource={deleteResource}
            editResource={editResource}
          />
          <div className="col-lg-2"></div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;
