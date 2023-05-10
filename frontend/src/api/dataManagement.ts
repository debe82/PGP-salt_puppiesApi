const BASE_URL = `http://localhost:8080/api/puppies`;

export type PuppyDto = {
  breed: string;
  name: string;
  birthDate: string;
}

export type Puppy = {
  id: number;
  breed: string;
  name: string;
  birthDate: string;
}

export async function getPuppies() {
   const apiResponse = await fetch(BASE_URL, { cache: 'no-store' });
   const data = await apiResponse.json();
   //console.log("dataManagement.getPuppies.data: ", data)
  return data;
};

export async function getPuppy(id: number) {
  //console.log("id received: ", id)
  const puppyUrl = BASE_URL + `/${id}`;
  const apiResponse = await fetch(puppyUrl, { cache: 'no-store' });
  const data = await apiResponse.json();
  //console.log(data);
 return data;
}

export async function addPuppy(puppy: PuppyDto) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    body: JSON.stringify(puppy),
    headers: {
      "content-type": "application/json",
    },
  });
  const json = (await response.json()) as { addedPuppy: PuppyDto };
  return json.addedPuppy;
}; 

export async function removePuppy(id: number) {
  const puppyUrl = BASE_URL + `/${id}`;
  const response = await fetch(puppyUrl, {
    method: "DELETE",
  });
};

export async function updatePuppys(puppy: Puppy) {
  const id = puppy.id
  console.log("id: ", id);
  const puppyUrl = BASE_URL + `/${id}`;
  const response = await fetch(puppyUrl, {
    method: "PATCH",
    body: JSON.stringify(puppy),
    headers: {
      "content-type": "application/json",
    },  });
  const json = (await response.json()) as { addedPuppy: Puppy };
  return json.addedPuppy;
}; 

export async function getPuppyImg() {
  const response = await fetch(`https://api.unsplash.com/photos/random/?client_id=5ujPO9yMbV51_t2f3UpCffXrecaB7-_9f85QFJqfO3U&query=puppy dog&count=1`);
  const data = await response.json();
  return data[0];
}
