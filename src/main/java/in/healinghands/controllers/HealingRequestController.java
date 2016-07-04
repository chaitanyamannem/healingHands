package in.healinghands.controllers;

import in.healinghands.dao.AuthenticationDAO;
import in.healinghands.dao.MemberDAO;
import in.healinghands.model.Authentication;
import in.healinghands.model.Member;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @author chaitanya
 *
 */
@Controller
public class HealingRequestController {
	
	@RequestMapping(value = "/healingRequest", method = RequestMethod.GET)
	@ResponseBody
	public Map<String, Object> healingRequest(String authToken) {
		Authentication authentication = null;
		Member member = null;
		
		Map<String, Object> model = new HashMap<String, Object>();
		try {
			authentication = authDAO.findByAuthToken(authToken);
			member = memberDAO.findByAuthentication(authentication);
		} catch (Exception ex) {
			model.put("id", ex.toString());
			return model;
		}
		model.put("firstName", member.getFirstName());
		model.put("lastName", "Welcome " + member.getLastName());
		return model;
	}
	
	@Autowired
	private AuthenticationDAO authDAO;
	@Autowired
	private MemberDAO memberDAO;

}
