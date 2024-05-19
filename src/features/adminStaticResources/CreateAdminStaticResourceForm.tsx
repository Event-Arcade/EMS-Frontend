import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import AdminStaticResource from "../../interfaces/AdminStaticResource";
import { useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { adminStaticResourceCreate } from "./AdminStaticResourceSlice";


export default function CreateAdminStaticResourceForm() {
    const dispatch = useAppDispatch();
    const [resource, setResource] = useState<AdminStaticResource>({
        name: "",
        description: "",
        resourceUrl: "",
        adminId: "",
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", resource?.name || "");
        formData.append("description", resource?.description || "");
        formData.append("resource", resource?.resourceFile || "");

        dispatch(adminStaticResourceCreate(formData));
      }
  
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
                value={resource?.name || ""}
                onChange={(e) => {setResource({...resource, name: e.target.value})}}
                required
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={resource?.description || ""}
                onChange={(e) => {setResource({...resource, description: e.target.value})}}
                required
              />
            </Form.Group>
            <Form.Group controlId="file">
                <Form.Label>File</Form.Label>
                <Form.Control
                    type="file"
                    accept="image/*, video/*, .pdf"
                    onChange={(e) =>
                            {setResource({...resource, resourceFile: (e.target as HTMLInputElement).files?.[0]})}
                    }
                    required
                />
            </Form.Group>
            <Button
              type="submit"
              style={{ width: "150px", margin: "20px" }}
              variant="warning"
            >
              Add Resource
            </Button>
          </Form>
        </>
      );
  
}



function createResource(formData: FormData): any {
  throw new Error("Function not implemented.");
}
  