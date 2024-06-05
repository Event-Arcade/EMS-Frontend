import { ChangeEvent, FormEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Category from "../../interfaces/Category";
import { useAppDispatch } from "../../store/hooks";
import { categoryCreate } from "./CategorySlice";

export default function CreateCategoryForm() {
  const dispatch = useAppDispatch();
  const [category, setCategory] = useState<Category>({
    name: "",
    description: "",
    imageFile: null,
    categoryImagePath: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", category.name);
    formData.append("description", category.description);
    if (category.imageFile) {
      formData.append("categoryImage", category.imageFile);
    }

    dispatch(categoryCreate(formData));

    setCategory({
      name: "",
      description: "",
      imageFile: null,
      categoryImagePath: "",
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCategory({
        ...category,
        imageFile: e.target.files[0],
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2
        style={{
          padding: "40px 0px 20px 0",
          color: "#BDBDBD",
          fontSize: "30px",
          textAlign: "left",
        }}
      >
        Create Category
      </h2>
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          value={category.name}
          onChange={(e) => {
            setCategory({ ...category, name: e.target.value });
          }}
          required
        />
      </Form.Group>

      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter description"
          value={category.description}
          onChange={(e) => {
            setCategory({ ...category, description: e.target.value });
          }}
          maxLength={500}
          required
        />
      </Form.Group>

      <Form.Group controlId="categoryImage">
        <Form.Label>Category Background Image</Form.Label>
        <Form.Control
          type="file"
          // image only accepts
          placeholder="Enter Image for the category background"
          onChange={handleFileChange}
          required
          max={1}
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
}

//TODO: add loading spinner
