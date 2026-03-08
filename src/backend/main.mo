import Map "mo:core/Map";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";

actor {
  var nextId = 1;

  let submissions = Map.empty<Nat, Submission>();
  let admin : Principal = Principal.fromText("rrkah-fqaaa-aaaaa-aaaaq-cai");

  type Submission = {
    id : Nat;
    name : Text;
    email : Text;
    organization : ?Text;
    message : Text;
    timestamp : Time.Time;
  };

  func validateInput(name : Text, email : Text) {
    if (name.trim(#char ' ') == "") {
      Runtime.trap("Name cannot be empty");
    };
    if (email.trim(#char ' ') == "") {
      Runtime.trap("Email cannot be empty");
    };
  };

  public shared ({ caller }) func submitForm(name : Text, email : Text, organization : ?Text, message : Text) : async () {
    validateInput(name, email);

    let newSubmission = {
      id = nextId;
      name;
      email;
      organization;
      message;
      timestamp = Time.now();
    };

    submissions.add(nextId, newSubmission);
    nextId += 1;
  };

  public query ({ caller }) func getAllSubmissions() : async [Submission] {
    if (caller != admin) {
      Runtime.trap("Unauthorized: Only admin can access all submissions");
    };
    submissions.values().toArray();
  };

  public query ({ caller }) func getSubmission(id : Nat) : async Submission {
    switch (submissions.get(id)) {
      case (null) { Runtime.trap("Submission not found") };
      case (?submission) { submission };
    };
  };
};
