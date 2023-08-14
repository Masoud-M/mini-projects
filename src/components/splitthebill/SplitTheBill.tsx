import { useState } from "react";
import nextId from "react-id-generator";

interface FriendProps {
  id: string;
  name: string;
  image: string;
  balance: number;
}

const initialFriends: FriendProps[] = [
  {
    id: "118836",
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: "933372",
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: "499476",
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

const SplitTheBill = () => {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState<FriendProps | null>(
    null
  );

  function handleShowAddFriend() {
    setShowAddFriend((prev) => !prev);
  }

  function handleAddFriend(friend: FriendProps) {
    setFriends((prev) => [...prev, friend]);
    setShowAddFriend(false);
  }

  function handleSelection(friend: FriendProps) {
    setSelectedFriend((prev) => (prev?.id === friend.id ? null : friend));
  }

  function handleSplitBill(value: number) {
    setFriends((prev) =>
      prev.map((friend) =>
        friend.id === selectedFriend?.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFriend(null);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <ul>
          {friends.map((friend) => (
            <Friend
              key={friend.name}
              friend={friend}
              name={friend.name}
              image={friend.image}
              id={friend.id}
              balance={friend.balance}
              selectedFriend={selectedFriend}
              onSelection={handleSelection}
            />
          ))}
        </ul>
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}

        <Button OnClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
        />
      )}
    </div>
  );
};

function Button({
  children,
  OnClick,
}: {
  children: React.ReactNode;
  OnClick?: () => void;
}) {
  return (
    <button className="button" onClick={OnClick}>
      {children}
    </button>
  );
}

interface FriendsListProp {
  id: string;
  friend: FriendProps;
  name: string;
  image: string;
  balance: number;
  selectedFriend: FriendProps | null;
  onSelection: (friend: FriendProps) => void;
}
function Friend({
  friend,
  name,
  image,
  id,
  balance,
  onSelection,
  selectedFriend,
}: FriendsListProp) {
  const isSelected = friend.id === selectedFriend?.id;
  return (
    <li key={id}>
      <img src={image} alt="/" />
      <h3>{name}</h3>
      <p className="red">
        {balance < 0 && `You owe ${name} $${Math.abs(balance)}`}
      </p>
      <p className="green">
        {balance > 0 && `${name} owes you $${Math.abs(balance)}`}
      </p>
      <p>{balance === 0 && `You and ${name} are even`}</p>

      <Button OnClick={() => onSelection(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function FormAddFriend({
  onAddFriend,
}: {
  onAddFriend: (friend: FriendProps) => void;
}) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmitFormAddFriend(e: React.FormEvent) {
    e.preventDefault();
    const id = nextId();

    const newFriend: FriendProps = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };

    onAddFriend(newFriend);
    setName("");
    setImage("https://i.pravatar.cc/48");
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmitFormAddFriend}>
      <label>Friend Name</label>
      <input
        type="text"
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setName(e.target.value)
        }
      />

      <label>Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setImage(e.target.value)
        }
      />

      <Button>Add</Button>
    </form>
  );
}

interface FromSplitBillProps {
  selectedFriend: FriendProps;
  onSplitBill: (value: number) => void;
}

function FormSplitBill({ selectedFriend, onSplitBill }: FromSplitBillProps) {
  const [bill, setBill] = useState(0);
  const [paidByUser, setPaidByUser] = useState(0);
  const paidByFriend = bill - paidByUser;
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!bill || !paidByUser) return;

    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
  }
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split the bill with {selectedFriend.name}</h2>

      <label>Bill Value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>Your expence</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
          )
        }
      />

      <label>{selectedFriend.name}'s expence</label>
      <input type="text" disabled value={paidByFriend} />

      <label>Who is paying</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value={"user"}>You</option>
        <option value={"friend"}>{selectedFriend.name}</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}
export default SplitTheBill;
