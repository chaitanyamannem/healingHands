package in.healinghands.controllers;

import in.healinghands.dao.AuthenticationDAO;
import in.healinghands.dao.MemberDAO;
import in.healinghands.model.Authentication;
import in.healinghands.model.Member;
import in.healinghands.model.Member.MemberType;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * A class to test interactions with the MySQL database using the
 * AuthenticationDAO class.
 *
 * @author chaitanya
 */
@Controller
public class AuthenticationController {

	private final Logger log = LoggerFactory.getLogger(this.getClass());

	// ------------------------
	// PUBLIC METHODS
	// ------------------------

	/**
	 * /create --> Create a new user and save it in the database.
	 * 
	 * @param email
	 *            User's email
	 * @param name
	 *            User's name
	 * @return A string describing if the user is succesfully created or not.
	 */
	@RequestMapping("/create")
	@ResponseBody
	public Map<String, Object> create(String email, String password, String firstName, String lastName, String type) {
		Authentication authentication = null;
		Member member = null;
		MemberType memberType = null;
		if(MemberType.HEALER.name().equals(type)){
			memberType = MemberType.HEALER;
		} else if(MemberType.PATIENT.name().equals(type)){
			memberType = MemberType.PATIENT;
		}
		Map<String, Object> model = new HashMap<String, Object>();
		try {
			authentication = new Authentication(email, password);
			member = new Member(firstName, lastName,
					authDAO.save(authentication), memberType);
			memberDAO.save(member);
		} catch (Exception ex) {
			model.put("id", ex.toString());
			return model;
		}
		model.put("id", authentication.getId());
		model.put("content", "Welcome " + member.getFirstName());
		return model;
	}

	// /**
	// * /delete --> Delete the user having the passed id.
	// *
	// * @param id
	// * The id of the user to delete
	// * @return A string describing if the user is succesfully deleted or not.
	// */
	// @RequestMapping("/delete")
	// @ResponseBody
	// public String delete(long id) {
	// try {
	// User user = new User(id);
	// userDao.delete(user);
	// } catch (Exception ex) {
	// return "Error deleting the user: " + ex.toString();
	// }
	// return "User succesfully deleted!";
	// }
	//
	/**
	 * /get-by-email --> Return the id for the user having the passed email.
	 * 
	 * @param email
	 *            The email to search in the database.
	 * @return The user id or a message error if the user is not found.
	 */
	@RequestMapping("/getByEmail")
	@ResponseBody
	public Map<String, Object> getByEmail(String email, String password) {
		Map<String, Object> model = new HashMap<String, Object>();
		String authId;
		String content;
		boolean userAuthorized = false;
		try {
			Authentication auth = authDAO.findByEmail(email);
			log.info("user = " + auth.getEmail());
			userAuthorized = new BCryptPasswordEncoder().matches(password,
					auth.getPassword());
			log.info("userAuthorized = " + userAuthorized);
			authId = String.valueOf(auth.getId());
			content = auth.getPassword();
		} catch (Exception ex) {
			model.put("error", ex.toString());
			return model;
		}
		if (userAuthorized) {
			model.put("id", authId);
			model.put("content", "Welcome " + content);
		}
		return model;
	}
	
	@RequestMapping("/emailAvailable")
	@ResponseBody
	public Map<String, Object> emailAvailable(String email) {
		Map<String, Object> model = new HashMap<String, Object>();
		boolean hasEmail = false;
		try {
			Authentication auth = authDAO.findByEmail(email);
			if (auth != null) {
				hasEmail = true;
			}
		} catch (Exception ex) {
			model.put("error", ex.toString());
			return model;
		}
		model.put("hasEmail", hasEmail);
		return model;
	}

	//
	// /**
	// * /update --> Update the email and the name for the user in the database
	// * having the passed id.
	// *
	// * @param id
	// * The id for the user to update.
	// * @param email
	// * The new email.
	// * @param name
	// * The new name.
	// * @return A string describing if the user is succesfully updated or not.
	// */
	// @RequestMapping("/update")
	// @ResponseBody
	// public String updateUser(long id, String email, String name) {
	// try {
	// User user = userDao.findOne(id);
	// user.setEmail(email);
	// user.setName(name);
	// userDao.save(user);
	// } catch (Exception ex) {
	// return "Error updating the user: " + ex.toString();
	// }
	// return "User succesfully updated!";
	// }

	// ------------------------
	// PRIVATE FIELDS
	// ------------------------

	@Autowired
	private AuthenticationDAO authDAO;
	@Autowired
	private MemberDAO memberDAO;

}
