package in.healinghands.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 * @author chaitanya
 *
 */
@Entity
@Table(name = "Authentication")
public class Authentication {

	// An autogenerated id (unique for each user in the db)
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;

	@NotNull
	private String email;

	private String password;

	private String facebookUserId;

	// Public methods

	public Authentication() {
	}

	public Authentication(long id) {
		this.id = id;
	}

	public Authentication(String email, String password) {
		this.email = email;
		this.password = new BCryptPasswordEncoder().encode(password);
	}

	public Authentication(String email, String password,
			String facebookUserId) {
		this.email = email;
		this.password = new BCryptPasswordEncoder().encode(password);
		this.facebookUserId = facebookUserId;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getFacebookUserId() {
		return facebookUserId;
	}

	public void setFacebookUserId(String facebookUserId) {
		this.facebookUserId = facebookUserId;
	}

}
